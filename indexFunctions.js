// Initialize user character
var img = document.querySelector('.imgBox');
var avatar = document.getElementById('avatar')

// Initialize information boxes
var intro = document.querySelector('.infoBoxIntro');
var proj = document.querySelector('.infoBoxProj');
var achieve = document.querySelector('.infoBoxAchieve');
var act = document.querySelector('.infoBoxAct');

// Initialize paragraph, mobile mode div and other misc variables
var infoPara = document.getElementById('infoPara');
var mobile = document.querySelector('.mobile');
var down = false;
var key, activeUserForward, activeUserLeft, activeUserRight, activeUserBack, topPos, leftPos, rightPos, botPos;

// Get webpage locations of info boxes and user img
var introBounds = intro.getBoundingClientRect();
var projBounds = proj.getBoundingClientRect();
var achieveBounds = achieve.getBoundingClientRect();
var actBounds = act.getBoundingClientRect();
var imgBounds = img.getBoundingClientRect();

// Constructor for box
function Box(x1, x2, y1, y2, type) {
  this.x1 = x1;
  this.x2 = x2;
  this.y1 = y1;
  this.y2 = y2;
  this.type = type;
}
Box.prototype.crossCheck = function() {
  imgBounds = img.getBoundingClientRect();
  if ((imgBounds.top + 10 < this.y1 &&
      imgBounds.top + 10 > this.y2 &&
      imgBounds.left + 10 > this.x1 &&
      imgBounds.left + 10 < this.x2)) {
    window.location = this.type + ".html";
  }
}

// Initialize info boxes
var introBox = new Box(introBounds.left, introBounds.right, introBounds.bottom, introBounds.top, 'intro');
var projBox = new Box(projBounds.left, projBounds.right, projBounds.bottom, projBounds.top, 'proj');
var achieveBox = new Box(achieveBounds.left, achieveBounds.right, achieveBounds.bottom, achieveBounds.top, 'achieve');
var actBox = new Box(actBounds.left, actBounds.right, actBounds.bottom, actBounds.top, 'act');

// Initialize user character movement functionality: Move
document.addEventListener('keydown', function(e) {
    key = e.keyCode;
    if (!down) {
      switch (key) {
        case 87:
          activeUserForward = setInterval(forward, 40);
          activeImage = setInterval(walkingForward, 40);
          break;
        case 65:
          activeUserLeft = setInterval(left, 40);
          activeImage = setInterval(walkingLeft, 40);
          break;
        case 68:
          activeUserRight = setInterval(right, 40);
          activeImage = setInterval(walkingRight, 40);
          break;
        case 83:
          activeUserBack = setInterval(back, 40);
          activeImage = setInterval(walkingBack, 40);
          break;
        default:
          break;
      }
      down = true;
    }
    introBox.crossCheck();
    projBox.crossCheck();
    achieveBox.crossCheck();
    actBox.crossCheck();
  }

)

// Initialize user character movement functionality: Stop
document.addEventListener('keyup', function(e) {
  key = e.keyCode;
  switch (key) {
    case 87:
      clearInterval(activeUserForward);
      clearInterval(activeImage);
      down = false;
      break;
    case 65:
      clearInterval(activeUserLeft);
      clearInterval(activeImage);
      down = false;
      break;
    case 68:
      clearInterval(activeUserRight);
      clearInterval(activeImage);
      down = false;
      break;
    case 83:
      clearInterval(activeUserBack);
      clearInterval(activeImage);
      down = false;
      break;
    default:
      break;
  }
clearInterval(activeUserBack);
clearInterval(activeUserForward);
clearInterval(activeUserRight);
clearInterval(activeUserLeft):
})

// Avatar image change for animation functions
function forward() {
  topPos = img.offsetTop;
  img.style.top = topPos - 6 + 'px';
}

function left() {
  leftPos = img.offsetLeft;
  img.style.left = leftPos - 6 + 'px'
}

function right() {
  leftPos = img.offsetLeft;
  img.style.left = leftPos + 6 + 'px'
}

function back() {
  topPos = img.offsetTop;
  img.style.top = topPos + 6 + 'px'
}

mobile.onclick = function() {
	intro.style.cursor="pointer";
	intro.onclick = function() {
  	window.location = "intro.html";
  }
  proj.style.cursor="pointer";
  proj.onclick = function() {
  	window.location = "proj.html";
  }
  achieve.style.cursor="pointer";
  achieve.onclick = function() {
  window.location = "achieve.html";
  }
  act.style.cursor="pointer";
  act.onclick = function() {
  window.location = "act.html";
  }
  mobile.textContent = "Now tap on any box for more information"
}

function walkingLeft() {
  avatar.src = "left1"
  setTimeout(donothing(), 5);
  avatar.src = "left2"
  setTimeout(donothing(), 5);
  avatar.src = "left3"
  setTimeout(donothing(), 5);
}

function walkingRight() {
  avatar.src = "right1"
  setTimeout(donothing(), 5);
  avatar.src = "right2"
  setTimeout(donothing(), 5);
  avatar.src = "right3"
  setTimeout(donothing(), 5);
}

function walkingForward() {
  avatar.src = "right1"
  setTimeout(donothing(), 5);
  avatar.src = "right2"
  setTimeout(donothing(), 5);
  avatar.src = "right3"
  setTimeout(donothing(), 5);
}

function walkingBack() {
  avatar.src = "back1"
  setTimeout(donothing(), 5);
  avatar.src = "back2"
  setTimeout(donothing(), 5);
  avatar.src = "back3"
  setTimeout(donothing(), 5);
}

function donothing() {};
