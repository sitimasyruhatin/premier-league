let dbPromised = idb.open('favorite-team', 1, function (upgradeDb) {
  let favoriteTeamObjectStore = upgradeDb.createObjectStore('team', {
    keyPath: 'id',
  });
  favoriteTeamObjectStore.createIndex('name', 'name', {
    unique: false,
  });
});

function createFavoriteTeam(team) {
  dbPromised
    .then((db) => {
      let tx = db.transaction('team', 'readwrite');
      let store = tx.objectStore('team');
      store.add(team);
      return tx.complete;
    })
    .then(() => {
      M.toast({
        html: `<span>Success added to Favorite Team!</span>`,
        classes: 'toaster',
      });
      console.log('Tim berhasil di simpan.');
    });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then((db) => {
        let tx = db.transaction('team', 'readonly');
        let store = tx.objectStore('team');
        return store.getAll();
      })
      .then((team) => {
        resolve(team);
      });
  });
}

function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then((db) => {
        let tx = db.transaction('team', 'readonly');
        let store = tx.objectStore('team');
        return store.get(id);
      })
      .then((team) => {
        resolve(team);
      });
  });
}

function deleteFavoriteTeam(id) {
  dbPromised
    .then((db) => {
      let tx = db.transaction('team', 'readwrite');
      let store = tx.objectStore('team');
      store.delete(id);
      return tx.complete;
    })
    .then(() => {
      M.toast({
        html: `<span>Favorite Team deleted!</span>`,
        classes: 'toaster',
      });
      console.log('Favorite berhasil di hapus.');
    });
}
