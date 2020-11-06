document.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    let item = getDetailTeam();
    item.then((data) => {
      getDataDB(data);
    });
  }, 2000);
});

function getDataDB(data) {
  let btnFavorite = document.getElementById('favorite-btn');

  getById(data.id).then((dataDB) => {
    if (dataDB) {
      btnFavorite.classList.add('active');
      btnFavorite.onclick = () => {
        getAnimated();
        btnFavorite.classList.remove('active');
        console.log('Tombol Hapus di klik.');
        deleteFavoriteTeam(dataDB.id);
        getDataDB(data);
      };
    } else {
      btnFavorite.onclick = () => {
        getAnimated();
        btnFavorite.classList.add('active');
        console.log('Tombol Favorite di klik.');
        createFavoriteTeam(data);
        getDataDB(data);
      };
    }
    setTimeout(function () {
      btnFavorite.classList.remove('animate__animated', 'animate__heartBeat');
    }, 1000);
  });
}

function getAnimated() {
  document.getElementById('favorite-btn').className =
    'animate__animated animate__heartBeat';
}
