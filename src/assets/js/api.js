const baseUrl = 'https://api.football-data.org/v2/';
const options = {
  headers: { 'X-Auth-Token': 'dc7fc19b70f34e99a3bfaada0ac05ec4' },
};
const idLiga = 2021;
const imgHandler =
  "this.onerror = null; this.src = '../assets/images/image-default.webp'";

function getStandings(typeStandings) {
  if ('caches' in window) {
    caches
      .match(
        `${baseUrl}competitions/${idLiga}/standings?standingType=${typeStandings}`
      )
      .then((response) => {
        if (response) {
          response.json().then((data) => {
            showStandings(data, typeStandings);
          });
        } else {
          axios
            .get(
              `${baseUrl}competitions/${idLiga}/standings?standingType=${typeStandings}`,
              options
            )
            .then((response) => {
              showStandings(response.data, typeStandings);
            })
            .catch((error) => console.error(error));
        }
      });
  } else {
    axios
      .get(
        `${baseUrl}competitions/${idLiga}/standings?standingType=${typeStandings}`,
        options
      )
      .then((response) => {
        showStandings(response.data, typeStandings);
        console.log(showStandings(response.data, typeStandings));
      })
      .catch((error) => console.error(error));
  }
}

function showStandings(data, typeStandings) {
  let loader = `<div class="loader-container">
  <div class="loader"></div>
</div>`;

  document.getElementById(
    `standings-table-${typeStandings}`
  ).innerHTML = loader;

  let standingsTableHTML = `  
    <div class="card">
      <div class="card-content">
        <table class="striped responsive-table">
          <thead>
            <tr>
              <th>Position</th>
              <th class="th-club">Club</th>
              <th>Played</th>
              <th>Won</th>
              <th>Drawn</th>
              <th>Lost</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th>Points</th>
              <th class="center">Form</th>
            </tr>
          </thead>
          <tbody id="standings-item-${typeStandings}" class="standings-item">
          <tbody>
      </div>
    </div>`;

  document.getElementById(
    `standings-table-${typeStandings}`
  ).innerHTML = standingsTableHTML;

  let itemStandingsHTML = '';
  data.standings[0].table.forEach((data) => {
    let formHTML = '';

    if (data.form) {
      let form = data.form.split(',');
      for (let i = 0; i < form.length; i++) {
        if (form[i] === 'W') {
          formHTML += `<span class="new badge green" data-badge-caption="W"></span>`;
        } else if (form[i] === 'L') {
          formHTML += `<span class="new badge red" data-badge-caption="L"></span>`;
        } else {
          formHTML += `<span class="new badge grey" data-badge-caption="D"></span>`;
        }
      }
    }
    itemStandingsHTML += `
      <tr>
        <td class="center">${data.position}</td>
        <td class="td-club"><a href="./detail-team.html?id=${
          data.team.id
        }" class="txt-pink"><div class="image-container"><img src="${
      data.team.crestUrl
    }" class="responsive-img" onerror=${imgHandler} alt="Team Logo"></div><b>${
      data.team.name
    }</b></a>
        </td>
        <td class="center">${data.playedGames}</td>
        <td class="center">${data.won}</td>
        <td class="center">${data.draw}</td>
        <td class="center">${data.lost}</td>
        <td class="center">${data.goalsFor}</td>
        <td class="center">${data.goalsAgainst}</td>
        <td class="center">${data.goalDifference}</td>
        <td class="center"><b>${data.points}</b></td>
        <td class="center">${formHTML ? formHTML : '-'}</td>
      </tr>
      `;
  });

  document.getElementById(
    `standings-item-${typeStandings}`
  ).innerHTML = itemStandingsHTML;
}

function getTeams() {
  if ('caches' in window) {
    caches.match(`${baseUrl}competitions/${idLiga}/teams`).then((response) => {
      if (response) {
        response.json().then((data) => {
          showTeams(data);
        });
      } else {
        axios
          .get(`${baseUrl}competitions/${idLiga}/teams`, options)
          .then((response) => {
            showTeams(response.data);
          })
          .catch((error) => console.error(error));
      }
    });
  } else {
    axios
      .get(`${baseUrl}competitions/${idLiga}/teams`, options)
      .then((response) => {
        showTeams(response.data);
      })
      .catch((error) => console.error(error));
  }
}

function getDetailTeam() {
  return new Promise(function (resolve, reject) {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');

    if ('caches' in window) {
      caches.match(`${baseUrl}teams/${idParam}`).then(function (response) {
        if (response) {
          response.json().then((data) => {
            showDetailTeam(data);
            resolve(data);
          });
        } else {
          axios
            .get(`${baseUrl}teams/${idParam}`, options)
            .then((response) => {
              showDetailTeam(response.data);
              resolve(response.data);
            })
            .catch((error) => console.error(error));
        }
      });
    } else {
      axios
        .get(`${baseUrl}teams/${idParam}`, options)
        .then((response) => {
          showDetailTeam(response.data);
          resolve(response.data);
        })
        .catch((error) => console.error(error));
    }
  });
}

function showTeams(data) {
  let teamsHTML = `
    <header>
      <div class="row container">
        <div class="col s12">
          <h1>Teams</h1>
        </div>
      </div>
    </header>
    <div class="row container" id="list-team"></div>`;
  document.getElementById('teams').innerHTML = teamsHTML;
  let listTeams = '';
  data.teams.forEach((team) => {
    listTeams += `
        <div class="col s6 m6 l3">
          <div class="card">
            <div class="card-image">
              <img src="${team.crestUrl}" onerror=${imgHandler} alt="Team Logo">
            </div>
            <div class="card-content">
              <span class="card-title center txt-purple"><b>${team.name}</b></span>
            </div>
            <a href="./detail-team.html?id=${team.id}">
              <div class="card-action white-text center">View Detail</div>
            </a>
          </div>
        </div>
        `;
  });
  document.getElementById('list-team').innerHTML = listTeams;
}

function showDetailTeam(data) {
  let squadHTML = '';
  let dateOfBirth = '';
  let detailHTML = `
  <header>
    <div class="row container" id="header">
      <div class="col s12">
        <a id="favorite-btn" ><i class="material-icons">favorite</i></a>
      </div>
      <div class="col s12 m5 l3">
        <div class="team-logo">
          <img src="${
            data.crestUrl
          }" onerror=${imgHandler} class="responsive-img" alt="Team Logo">
        </div>
      </div>
   
      <div class="col s12 m7 l9">
        <h4>${data.name}</h4>
        <div class="row">
          <div class="col s12 l7">
            <ul>
              <li><i class="material-icons">location_on</i> ${
                data.address ? data.address : '-'
              }</li>
              <li><i class="material-icons">phone</i> ${
                data.phone ? data.phone : '-'
              }</li>
            </ul>
          </div>
          <div class="col s12 l5">
            <ul>
              <li><i class="material-icons">link</i><a href="${
                data.website ? data.website : '#'
              }">${data.website ? data.website : '-'}</a></li>
              <li><i class="material-icons">email</i>${
                data.email ? data.email : '-'
              }</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="container">
    <h5 class="txt-purple center"><b>Squad</b></h5>
    <div class="row">
      <div class="col s12" id="squad"></div>
    </div>
  </div>
  `;

  data.squad.forEach((data) => {
    dateOfBirth = data.dateOfBirth.split('T');
    let role = data.role.replace(/_/g, ' ');
    squadHTML += `
      <div class="col s12 m6 l4">
        <div class="card">
          <div class="card-image grey lighten-4">
          <div class="squad-name-position">
            <h6><b>${data.name ? data.name : '-'}</b></h6>
            <span>${data.position ? data.position : ''}</span>
          </div> 
          <img src="./src/assets/images/crew.webp" class="responsive-img"  onerror=${imgHandler} alt="Team Logo">
          </div>
          <div class="card-content">
            <ul class="collection">
              <li class="collection-item">Nationality <span class="secondary-content">${
                data.nationality ? data.nationality : '-'
              }</span></li>
              <li class="collection-item">Date of Birth <span class="secondary-content">${
                dateOfBirth[0] ? dateOfBirth[0] : '-'
              }</span></li>
              <li class="collection-item">Place of Birth <span class="secondary-content">${
                data.countryOfBirth ? data.countryOfBirth : '-'
              }</span></li>
              <li class="collection-item role" style="${
                data.role === 'PLAYER'
                  ? 'background-color: #3F1052'
                  : 'background-color: #ff2882'
              }">${role}</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  });
  document.getElementById('detail-team').innerHTML = detailHTML;
  document.getElementById('squad').innerHTML = squadHTML;
}

function getFavoriteTeam() {
  getAll().then((teams) => {
    let favoriteHTML = `
    <header>
      <div class="row container">
        <div class="col s12">
          <h1>Favorite Team</h1>
        </div>
      </div>
    </header>
    <div class="row container" id="list-team"></div>`;
    document.getElementById('favorite-team').innerHTML = favoriteHTML;
    if (teams.length > 0) {
      let listFavorite = '';
      teams.forEach((team) => {
        listFavorite += `
        <div class="col s6 m6 l3">
          <div class="card">
            <div class="card-image">
              <img src="${team.crestUrl}"  onerror="${imgHandler}" alt="Team Logo" >
            </div>
            <div class="card-content">
              <span class="card-title center txt-purple"><b>${team.name}</b></span>
            </div>
            <a href="./detail-team.html?id=${team.id}">
              <div class="card-action white-text center">View Detail</div>
            </a>
          </div>
        </div>
        `;
      });
      document.getElementById('list-team').innerHTML = listFavorite;
    } else {
      let defaultHTML = `
      <div class="col s12">
        <p class="no-data">
          Nothing favorited
        </p>
      </div>`;
      document.getElementById('list-team').innerHTML = defaultHTML;
    }
  });
}
