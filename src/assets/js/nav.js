document.addEventListener('DOMContentLoaded', function () {
  // Activate sidebar nav
  const elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
  loadNav();

  // Load page content
  let page = window.location.hash.substr(1);
  if (page == '') page = 'home';
  loadPage(page);
});

function loadNav() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status !== 200) return;

      // Muat daftar tautan menu
      document.querySelectorAll('.topnav, .sidenav').forEach((elm) => {
        elm.innerHTML = xhttp.responseText;
      });

      // Daftarkan event listener untuk setiap tautan menu
      document
        .querySelectorAll('.sidenav a, .topnav a')
        .forEach(function (elm) {
          elm.addEventListener('click', function (event) {
            // Tutup sidenav
            const sidenav = document.querySelector('.sidenav');
            M.Sidenav.getInstance(sidenav).close();

            // Muat konten halaman yang dipanggil
            page = event.target.getAttribute('href').substr(1);
            loadPage(page);
          });
        });
    }
  };
  xhttp.open('GET', './src/pages/nav.html', true);
  xhttp.send();
}

function loadPage(page) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      let content = document.querySelector('#body-content');
      if (this.status === 200) {
        content.innerHTML = xhttp.responseText;
      } else if (this.status === 404) {
        content.innerHTML =
          '<div class="error"><img src="../src/assets/images/404.webp"> <h4>Halaman tidak ditemukan</h4></div>';
      } else {
        content.innerHTML =
          '<div class="error"><img src="../src/assets/images/warning.webp"> <h4>Halaman tidak dapat diakses</h4></div>';
      }
      if (page === 'home') {
        setTimeout(() => {
          getStandings(typeStandings);
        }, 2000);
      } else if (page === 'teams') {
        setTimeout(() => {
          getTeams();
        }, 2000);
      } else if (page === 'favorite') {
        setTimeout(() => {
          getFavoriteTeam();
        }, 2000);
      }

      M.AutoInit();
    }
  };
  xhttp.open('GET', `./src/pages/${page}.html`, true);
  xhttp.send();
}
