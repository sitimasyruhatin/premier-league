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
        btnFavorite.classList.toggle('active');
        console.log('Tombol Hapus di klik.');
        deleteFavoriteTeam(dataDB.id);
        getDataDB(data);
      };
    } else {
      btnFavorite.onclick = () => {
        console.log('Tombol Favorite di klik.');
        createFavoriteTeam(data);
        getDataDB(data);
      };
    }
  });
}
