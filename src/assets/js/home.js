let typeStandings = 'TOTAL';
document.addEventListener('DOMContentLoaded', function () {
  let page = window.location.hash.substr(1);
  if (page === 'home' || window.location.hash === '') {
    let standingsTotal = '';
    let standingsHome = '';
    let standingsAway = '';

    setTimeout(() => {
      standingsTotal = document.getElementById('tabTotal');
      standingsHome = document.getElementById('tabHome');
      standingsAway = document.getElementById('tabAway');

      standingsTotal.onclick = () => {
        typeStandings = 'TOTAL';
        getStandings(typeStandings);
      };
      standingsHome.onclick = () => {
        typeStandings = 'HOME';
        getStandings(typeStandings);
      };
      standingsAway.onclick = () => {
        typeStandings = 'AWAY';
        getStandings(typeStandings);
      };
    }, 1000);
  }
});
