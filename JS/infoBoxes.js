var backButton = document.querySelector('.backButton');
document.addEventListener('keydown', function(e) {
    key = e.keyCode;
    if (key === 32) {
      window.location = 'afterIndex.html';
      }
  })
backButton.addEventListener('click', function(e) {
    window.location = 'afterIndex.html';
    })
