var player;
var playerPet;
var playerScore;
var gameBackgrounds = [];
var clouds = [];
var timers = [];
var startButton;
var settingsButton;
var exitButton;
var gameLogo;
var gameMenu;
var gameInfo;
var introAnimate = false;
var introAnimateDone = false;
var logoAnimateDone = false;
var playerIntroAnimateDone = false;
var logoAnimateFrame = 0;
// Game height = 5/6 browser inner window height
var gameAreaHeight = (window.innerHeight/6) * 5;

timers.push({ delay: 100, nextFireTime: 0, doFunction: doTimers, counter: 0 });

function timerLoop(currentTime) {
  requestAnimationFrame(timerLoop);
  for(var i = 0; i < timers.length; i++) {
    if(currentTime > timers[i].nextFireTime) {
      var t = timers[i];
      t.nextFireTime = currentTime + t.delay;
      t.doFunction(t, i);
    }
  }
}

function doTimers(t, i) {
if(t == timers[0])  
  if((t.counter) / 10 % 1 == 0) {
    document.getElementById("label1").innerHTML = 'Timer: ' + precisionRound((t.counter)/10, 1) + '.0 (' + t.delay + 'ms)';
  } else {
    document.getElementById("label1").innerHTML = 'Timer: ' + precisionRound((t.counter)/10, 1) + ' (' + t.delay + 'ms)';
  }
  t.counter++;
}

function startGame() {
  // Sky
  gameBackgrounds.push(new component(1005, gameAreaHeight, 'resources/backgrounds/Background-sky-large.png', 0, 0, "background"));
  // Foreground clouds - background layer
  gameBackgrounds.push(new component(1005, gameAreaHeight, 'resources/backgrounds/Foreground-Clouds-large.png', 0, -30, "cloud"));
  gameBackgrounds.push(new component(1005, gameAreaHeight, 'resources/backgrounds/Foreground-Clouds-large.png', -1005, -80, "cloud"));
  // Rows of trees to create depth
  gameBackgrounds.push(new component(1005, gameAreaHeight, 'resources/backgrounds/Background-Trees+grass-large-single-row.png', 0, -70, "background"));
  gameBackgrounds.push(new component(1005 + 5, gameAreaHeight + 5, 'resources/backgrounds/Background-Trees+grass-large-single-row.png', 30, -65, "background"));
  gameBackgrounds.push(new component(1005 + 10, gameAreaHeight + 10, 'resources/backgrounds/Background-Trees+grass-large-single-row.png', -10, -60, "background"));
  // More trees in front of tower
  gameBackgrounds.push(new component(1005 + 15, gameAreaHeight + 15, 'resources/backgrounds/Background-Trees+grass-large-single-row.png', 20, -55, "background"));
  // gameBackgrounds.push(new component(1005 + 20, gameAreaHeight + 20, 'resources/backgrounds/Background-trees+grass-large-single-row.png', -30, -50, "background"));
  // Wizard Tower
  // gameBackgrounds.push(new component(200, 576 / 3 * 2, 'resources/backgrounds/svg/Wizard-Tower-Summer-2.svg', window.innerWidth - (576 / 3), 45, "image"));
  gameBackgrounds.push(new component(200, 576 / 3 * 2, 'resources/backgrounds/SVG/Wizard-Tower-Summer-2.svg', window.innerWidth, ((window.innerHeight / 3) * 2) - (576 / 3 * 2) - 45 , "image"));
  // gameBackgrounds.push(new component(576 / 3 * 2, 576 / 3 * 2, 'resources/Wizzard_Tower.gif', window.innerWidth - (576 / 3), 45, "image"));
  gameBackgrounds.push(new component(1005 + 20, gameAreaHeight + 20, 'resources/backgrounds/Background-grass-large-single-row.png', 0, -50, "background"));
  // gameBackgrounds.push(new component(1005 + 20, gameAreaHeight + 20, 'resources/backgrounds/Background-trees+grass-large-single-row.png', -50 , -50, "background"));
  gameBackgrounds.push(new component(1005 + 20, gameAreaHeight + 20, 'resources/backgrounds/Background-Trees+grass+dirt-large-single-row-gap.png', (gameBackgrounds[7].x - 400), -50, "trail"));
  gameBackgrounds.push(new component(1005 + 20, gameAreaHeight + 20, 'resources/backgrounds/Background-Trees+grass+dirt-large-single-row.png', gameBackgrounds[9].x - (gameBackgrounds[9].width) + 20, -50, "trail"));
  gameBackgrounds.push(new component(1005 + 20, gameAreaHeight + 20, 'resources/backgrounds/Background-Trees+grass+dirt-large-single-row.png', gameBackgrounds[10].x - (gameBackgrounds[10].width) + 20, -50, "trail"));
  gameBackgrounds.push(new component(1005 + 20, gameAreaHeight + 20, 'resources/backgrounds/Background-Trees+grass-large-single-row.png', gameBackgrounds[9].x + gameBackgrounds[9].width - 20, -50, "trail"));
  // Add low level foreground clouds 
  for(x = 0; x < 40; x++)
    clouds.push(new component(23, 8, 'resources/backgrounds/Single-Cloud.png', 3 * (Math.random() * Math.ceil(gameArea.canvas.width)), 2 *(Math.random() * Math.floor(gameArea.canvas.height)), "clouds"));
  
  // Add Player's character
  player = new characterComponent(32, 32, 'resources/characters/Wizard/SVG/Wizard-Right-2.svg', -160, 408, "player", true, 1, 3, 0, true);
  // Add Pet character
  playerPet = new characterComponent(20, 25, 'resources/npc/Duck-Right-2.png', -168, 470, "image", true, 1, 3, 0, true);
  // Set Player's gravity; also is pet's gravity
  player.gravity = 9.8;

  window.addEventListener('keydown', function keyPress(e) {
    gameArea.key = e.keyCode;
    if(gameArea.key == 65 && !gameArea.interval) {
      requestAnimationFrame(timerLoop);
      gameArea.interval = setInterval(updateGameArea, 20);
    }
  })

  gameArea.start();
  console.log("started");
}

var gameArea = {
  canvas : document.createElement("canvas"),
  
  start : function() {
    // Game Area is full width of window - 20px to allow 10px margin on each side for centering
    this.canvas.width = window.innerWidth - 30;
    // Game Area is 2/3 height of window
    this.canvas.height = (window.innerHeight / 3) * 2; 
    // Establish canvas 2d graphics
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    // Instantiate frame number
    this.frameNo = 0;
    // Add keydown event listener
    window.addEventListener('keydown', function keyPress(e) {
      gameArea.keysdown = (gameArea.keysdown || []);
      gameArea.keysup = (gameArea.keysup || []);
      gameArea.keysdown[e.keyCode] = true;
      gameArea.keysup[e.keyCode] = false;
    })
    // Add keyup event listener
    window.addEventListener('keyup', function (e) {
      gameArea.keysdown[e.keyCode] = false;
      gameArea.keysup[e.keyCode] = true;
    })
    // Update graphics
    updateGameArea();
  },

  // Stop game
  stop : function() {
    clearInterval(this.interval);
  }, 
  
  // Clear graphics
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
