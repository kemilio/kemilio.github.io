var backButton = document.querySelector('.backButton');
document.addEventListener('keydown', function(e) {
    key = e.keyCode;
    if (key === 32) {
      windowlocation = 'afterIndex.html';
      }
  }
backButton.addEventListener('click', function(e) {
    windowlocation = 'afterIndex.html';
    })
