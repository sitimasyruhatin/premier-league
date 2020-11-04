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

      standingsTotal.onclick = function () {
        typeStandings = 'TOTAL';
        getStandings(typeStandings);
      };
      standingsHome.onclick = function () {
        typeStandings = 'HOME';
        getStandings(typeStandings);
      };
      standingsAway.onclick = function () {
        typeStandings = 'AWAY';
        getStandings(typeStandings);
      };
    }, 100);
  }
});
