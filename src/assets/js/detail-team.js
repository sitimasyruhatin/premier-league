document.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    let item = getDetailTeam();
    item.then(function (data) {
      getDataDB(data);
    });
  }, 2000);
});

function getDataDB(data) {
  let btnFavorite = document.getElementById('favorite-btn');

  getById(data.id).then(function (dataDB) {
    if (dataDB) {
      btnFavorite.classList.add('active');
      btnFavorite.onclick = function () {
        btnFavorite.classList.toggle('active');
        console.log('Tombol Hapus di klik.');
        deleteFavoriteTeam(dataDB.id);
        getDataDB(data);
      };
    } else {
      btnFavorite.onclick = function () {
        console.log('Tombol Favorite di klik.');
        createFavoriteTeam(data);
        getDataDB(data);
      };
    }
  });
}
