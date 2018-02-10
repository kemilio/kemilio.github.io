// Initialize user character
var img = document.querySelector('.imgBox');
var user = document.getElementById('avatar');
var hasMoved = false;
var isMoving = false;

// Initialize information boxes
var intro = document.querySelector('.infoBoxIntro');
var proj = document.querySelector('.infoBoxProj');
var exp = document.querySelector('.infoBoxExp');
var act = document.querySelector('.infoBoxAct');

// Initialize paragraph, mobile mode div and other misc variables
var infoPara = document.getElementById('infoPara');
var mobile = document.querySelector('.mobile');
var down = false;
var key, activeUserForward, activeUserLeft, activeUserRight, activeUserBack, topPos, leftPos, rightPos, botPos, switchBool;

// Get webpage locations of info boxes and user img
var introBounds = intro.getBoundingClientRect();
var projBounds = proj.getBoundingClientRect();
var expBounds = exp.getBoundingClientRect();
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
  if ((imgBounds.top + 10 < this.y1 || imgBounds.top < this.y1) &&
      (imgBounds.top + 10 > this.y2 || imgBounds.top > this.y2) &&
      (imgBounds.left + 10 > this.x1 || imgBounds.left > this.x1) &&
      (imgBounds.left + 10 < this.x2 || imgBounds.left < this.x2)) {
    window.location = this.type + ".html";
  }
}

// Initialize info boxes
var introBox = new Box(introBounds.left, introBounds.right, introBounds.bottom, introBounds.top, 'intro');
var projBox = new Box(projBounds.left, projBounds.right, projBounds.bottom, projBounds.top, 'proj');
var expBox = new Box(expBounds.left, expBounds.right, expBounds.bottom, expBounds.top, 'exp');
var actBox = new Box(actBounds.left, actBounds.right, actBounds.bottom, actBounds.top, 'act');

// Initialize user character movement functionality: Move
document.addEventListener('keydown', function(e) {
    switchBool = true;
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
	  switchBool = false;
          break;
      }
    }
	if (switchBool) {
		hasMoved = true;
		isMoving = true;
		down = true;
	}
    introBox.crossCheck();
    projBox.crossCheck();
    expBox.crossCheck();
    actBox.crossCheck();
  }

)

// Initialize user character movement functionality: Stop
document.addEventListener('keyup', function(e) {
  switchBool = true;
  key = e.keyCode;
  switch (key) {
    case 87:
      clearInterval(activeUserForward);
      break;
    case 65:
      clearInterval(activeUserLeft);
      break;
    case 68:
      clearInterval(activeUserRight);
      break;
    case 83:
      clearInterval(activeUserBack);
      break;
    default:
      switchBool = false;
      break;
  }
if (switchBool) {
	clearInterval(activeImage);
        down = false;
	isMoving = false;
	activeImage = setInterval(standingAni, 40);
	}
})

// Relocate user to webpage selected after clicking mobile button
mobile.onclick = function() {
	intro.style.cursor="pointer";
	intro.onclick = function() {
  	window.location = "intro.html";
  }
  proj.style.cursor="pointer";
  proj.onclick = function() {
  	window.location = "proj.html";
  }
  exp.style.cursor="pointer";
  exp.onclick = function() {
  window.location = "exp.html";
  }
  act.style.cursor="pointer";
  act.onclick = function() {
  window.location = "act.html";
  }
  mobile.textContent = "Now tap on any box for more information"
}

// User image movement for animation functions
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

// Change user image for animations
function walkingLeft() {
// Working on a good animation technqiue; tricky with a single thread!
//user.src = "stickfigureart/runl1.png";
//setTimeout(donothing, 5);
//user.src = "stickfigureart/runl2.png";
//setTimeout(donothing, 5);
  user.src = "stickfigureart/runl3.png";
//setTimeout(donothing, 5);
}

function walkingRight() {
// Working on a good animation technique; tricky with a single thread!
  user.src = "stickfigureart/runr1.png";
//  setTimeout(donothing, 5);
//  user.src = "stickfigureart/runr2.png";
//  setTimeout(donothing, 5);
//user.src = "stickfigureart/runr3.png";
  setTimeout(donothing, 5);
}

function walkingForward() {
// Working on a good animation technique; tricky with a single thread!
//user.src = "stickfigureart/runf1.png";
//setTimeout(donothing, 5);
//user.src = "stickfigureart/runf2.png";
//setTimeout(donothing, 5);
  user.src = "stickfigureart/runf3.png";
  setTimeout(donothing, 5);
}

function walkingBack() {
// Working on a good animation technique; tricky with a single thread!
//user.src = "stickfigureart/runb1.png";
//setTimeout(donothing, 5);
//user.src = "stickfigureart/runb2.png";
//setTimeout(donothing, 5);
  user.src = "stickfigureart/runb3.png";
//setTimeout(donothing, 5);
}

function donothing() {};

// User image will wave until user moves
function standingAni() {
	function waveOne() {
  	user.src = "stickfigureart/wave1.png";
  }
  function waveTwo() {
  	user.src = "stickfigureart/wave2.png";
  }
  function waveThree() {
  	user.src = "stickfigureart/wave3.png";
  }
	if (hasMoved && !isMoving) {
	user.src = "stickfigureart/stand.png";
	}
	else if (!hasMoved && !isMoving) {
	user.src = "stickfigureart/wave1.png";
	//waveOne();
	//console.log("First wave");
  	//setTimeout(waveTwo, 500);
	//console.log("Second wave");
  	//setTimeout(waveThree, 1000);
	//setTimeout(waveTwo, 1500);
	}
}

standingAni();
