var block1 = document.querySelector(".block1");
const container = document.querySelector('.container')
var block2 = document.querySelector(".block2");
var character = document.getElementById("character");
var hole = document.getElementById("hole");
var jumping = 0;
var counter = 0;
var gravity = 0.5; 
const JUMP_ROTATION_SPEED = 0.1; 
const FALL_ROTATION_SPEED = -0.1; 
const MAX_ROTATION = 30 * Math.PI / 180; 
const MIN_ROTATION = -30 * Math.PI / 180;
let rotation = 0; 

function updateRotation() {
  if (jumping) {
    rotation += JUMP_ROTATION_SPEED;
    if (rotation > MAX_ROTATION) {
      rotation = MAX_ROTATION;
    }
  } else {
    rotation += FALL_ROTATION_SPEED;
    if (rotation < MIN_ROTATION) {
      rotation = MIN_ROTATION;
    }
  }
  character.style.rotate= rotation + "rad";
}


function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
};


container.addEventListener('animationiteration', () => {
  let random = randomIntFromInterval(1, 300);
  var randomHeight = random + "px";
  block1.style.height = randomHeight;
  hole.style.top = randomHeight;
  var block2Height = 500 - random - 150 + "px";
  block2.style.height = block2Height;
  hole.style.bottom = block2Height;
  counter++;
}); 


  setInterval(function () {
  var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  if (jumping === 0) {
    character.style.top = characterTop + 3  + "px";
  }
  updateRotation();
  let holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
  let holeBottom = parseInt(window.getComputedStyle(hole).getPropertyValue("bottom"));
  let holeLeft = parseInt(window.getComputedStyle(hole).getPropertyValue("left"));
  
  
  if ( ((characterTop >= 480) || (characterTop <= 2)) || ( ((holeLeft <= 70) && (holeLeft >= 20 )) && ((characterTop <= holeTop) || (characterTop >= holeBottom)) ) ) {
    alert("Game over. Score: " + (counter - 1 )); 
    character.style.top = 100 + "px";
    rotation = 0;
    character.style.rotate = rotation + "rad"; 
    counter = 0;
  }
}, 10);

document.body.onkeydown = function(e) {
  if (e.key == " " ||
      e.code == "Space" ||      
      e.keyCode == 32      
  ) { 
    jump();
  }
}

function jump() {
  jumping = 1;
  let jumpCount = 0;
  var jumpInterval = setInterval(function() {
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if ((characterTop > 6) && (jumpCount < 15)) {
      character.style.top = (characterTop - 5 ) + "px"; 
    } else {
      character.style.top = (characterTop + gravity) + "px"; 
    }
    updateRotation();
    if (jumpCount > 20) {
      clearInterval(jumpInterval);
      jumping = 0;
      jumpCount = 0;
    }
    jumpCount++;
  }, 10);
}







