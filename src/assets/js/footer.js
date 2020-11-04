document.addEventListener('DOMContentLoaded', function () {});

loadFooter();

function loadFooter() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status !== 200) return;

      // Muat daftar tautan menu
      document.querySelectorAll('.page-footer').forEach((elm) => {
        elm.innerHTML = xhttp.responseText;
      });
    }
  };
  xhttp.open('GET', './src/pages/footer.html', true);
  xhttp.send();
}
