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
  console.log("img x1: " + imgBounds.left);
  console.log("img x2: " + imgBounds.right);
  console.log("img y1: " + imgBounds.bottom);
  console.log("img y2: " + imgBounds.top);
  if ((imgBounds.top + 10 < this.y1 &&
      imgBounds.top + 10 > this.y2 &&
      imgBounds.left + 10 > this.x1 &&
      imgBounds.left + 10 < this.x2)) {
    window.location = this + ".html";
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
})

// Avatar image change for animation functions
function forward() {
  topPos = img.offsetTop;
  img.style.top = topPos - 3 + 'px';
}

function left() {
  leftPos = img.offsetLeft;
  img.style.left = leftPos - 3 + 'px'
}

function right() {
  leftPos = img.offsetLeft;
  img.style.left = leftPos + 3 + 'px'
}

function back() {
  topPos = img.offsetTop;
  img.style.top = topPos + 3 + 'px'
}

mobile.onclick = function() {
	intro.style.cursor="pointer";
	intro.onclick = function() {
  	infoPara.textContent = "TO INTRO!!";
  }
  proj.style.cursor="pointer";
  proj.onclick = function() {
  	infoPara.textContent = "TO PROJ!!";
  }
  achieve.style.cursor="pointer";
  achieve.onclick = function() {
  	infoPara.textContent = "TO ACHIEVE!!";
  }
  act.style.cursor="pointer";
  act.onclick = function() {
  	infoPara.textContent = "TO ACT!!";
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
