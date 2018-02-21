/* 
    GOBLET
    Created By Cody Coulter
*/

// Variable Instantiation
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

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image" || type == "background" || type == "cloud" || 
      type == "clouds" || type == "trail") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.angle = 0;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = gameArea.context;
        if (type == "image" || type == "background" || type == "cloud" || type == "clouds" || type == "trail") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        if (type == "background") {
          for(i = 0; i < 4; i++)
            ctx.drawImage(this.image, 
              this.x + (this.width * i), this.y, this.width, this.height);
        }
        // if (type == "cloud") {
        //     ctx.drawImage(this.image, 
        //       this.x - this.width, this.y, this.width, this.height);
        // }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.updateStar = function() {
        ctx = gameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        if(type == "image"){
            ctx.drawImage(this.image,
                this.width / -2,
                this.height / -2,
                this.width,
                this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        }
        ctx.restore();    
    }
    this.newPos = function() {
      this.angle += this.moveAngle * Math.PI/100;
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.type == "background") {
          if(this.x == -(this.width)) {
            this.x = 0;
          }
        }
        if(this.type == "cloud" || this.type == "clouds") {
          if(this.x >= gameArea.canvas.width) {
            this.x = 0 - this.width;
          }
        }        
    }    
}

function characterComponent(width, height, color, x, y, type, falling, direction, speed, score, canDoubleJump) {
  this.type = type;
  if(this.type == "player") {
    this.image = new Image();
    this.image.src = color;
  } else if(type == "image" || type == "background") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.falling = falling;
  this.lastDirection = direction;
  this.speed = speed;
  this.score = score;
  this.gravity= 9.8;
  this.canDoubleJump = canDoubleJump;
  this.maxY = y;
  this.lowestY = y;
  this.stepCount = 0;
  this.frontX = this.x + this.width / 2;
  this.projectiles = [];
  if(canDoubleJump)
    this.doubleJump = 0;
  // Uncomment to enable bounce
  // this.bounce = 0.5;
  this.gravitySpeed = 0.05;
  // this.speedConstant = 2.5;
  this.friction = 0.95;
  this.update = function() {
    ctx = gameArea.context;
    if(this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText = (this.text, this.x, this.y);
    } else if(this.type == "player" || this.type == "image") {
      ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
    } else if(this.type == "background") {
      ctx.drawImage(this.image,
        this.x + this.width,
        this.y,
        this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    for(i = 0; i < this.projectiles.length; i++) {
      if(this.projectiles[i].x > gameArea.canvas.width || this.projectiles[i].x < 0)
        this.projectiles.splice(i, 1);
      else {
        this.projectiles[i].newPos();
        this.projectiles[i].update();    
      }
    }
  }
  this.fire = function() {
    if(this.lastDirection == 1 ) {
      this.projectiles.push(new component(16, 7, 'resources/projectiles/Red-Projectile-Narrow.png', this.frontX, this.y + (this.height/2), "image"));
      this.projectiles[this.projectiles.length - 1].speedX = 7;
    }
    else if(this.lastDirection == 0) {
      this.projectiles.push(new component(-16, 7, 'resources/projectiles/Red-Projectile-Narrow-Reverse.png', this.frontX, this.y + (this.height/2), "image"));
      this.projectiles[this.projectiles.length - 1].speedX = -7;
    }
    
    // for(i = 0; i < this.projectiles.length; i++) {
    //   this.projectiles[i].speedX = 7;
    // }
  }
  this.checkSpeed = function() {
    if(this.gravitySpeed > 2)
      this.gravitySpeed = 2;
    if(this.gravitySpeed < -2)
      this.gravitySpeed = -2;
  }
  this.newPos = function() {
    this.speedY += this.gravity + this.gravitySpeed;
    // this.speedY = this.speedY + this.gravitySpeed;
    this.angle += this.moveAngle * Math.PI / 100;
    this.x += this.speedX;
    this.y += this.speedY;
    // if(this.type == "background") {
    //   if (this.x == -(this.width)) {
    //     this.x = 0;
    //   }
    // }
    this.hitBounds();
  }
  this.animateCharacter = function(i, path) {

    // Create Left Object
    characterLeftImage = [];
    characterLeftImage.push(new Image());
    characterLeftImage.push(new Image());
    characterLeftImage.push(new Image());

    // Setup Left Image List
    characterLeft = [];
    characterLeft.push('resources/' + path + '-Left-1.png');
    characterLeft.push('resources/' + path + '-Left-2.png');
    characterLeft.push('resources/' + path + '-Left-3.png');

    // Start image preloading
    for(x = 0; x < 3; x++) {
      characterLeftImage[x].src = characterLeft[x];
    }

    // Create Right Object
    characterRightImage = [];
    characterRightImage.push(new Image());
    characterRightImage.push(new Image());
    characterRightImage.push(new Image());

    // Setup Right Image List
    characterRight = [];
    characterRight.push('resources/' + path + '-Right-1.png');
    characterRight.push('resources/' + path + '-Right-2.png');
    characterRight.push('resources/' + path + '-Right-3.png');

    // Start image preloading
    for(x = 0; x < 3; x++)
      characterRightImage[x].src = characterRight[x]; 

    if(this.stepCount > 2)
      this.stepCount = 0;
    if(i == 1) {
      this.frontX = this.x + ((this.width / 3) * 2);
      switch(this.stepCount) {
        case 1:
          this.image = characterRightImage[2];
          break;
        case 2:
          this.image = characterRightImage[0];
          break;
        default:
          this.image = characterRightImage[1];
          break;
      }
    } else if(i == 0){
      this.frontX = this.x;
      switch(this.stepCount) {
        case 1:
          this.image = characterLeftImage[2];
          break;
        case 2:
          this.image = characterLeftImage[0];
          break;
        default:
          this.image = characterLeftImage[1];
          break;
      }
    }
  }
  this.checkDirection = function() {
    if (this.lastDirection == 1) {
      // Right
      return '\u2192';
    } else if (this.lastDirection == 0) {
      // Left
      return '\u2190';
    } else if (this.lastDirection == 2) {
      return "idle"
    } else {
      return "No direction listed";
    }
  }
  this.hitBounds = function() {
    var bottomBound = gameArea.canvas.height - this.height * 1.5;
    var topBound = 0;
    var leftBound = 0;
    var rightBound = gameArea.canvas.width - this.width;
    if (this.y > bottomBound) {
      this.y = bottomBound;
      this.gravitySpeed = 0;
      this.speedY = 0;
      this.falling = false;
      this.jumped = false;
      this.doubleJump = 0;
      // If Bounce enabled 
      // this.gravitySpeed = -(this.gravitySpeed * this.bounce);
    }
    if(playerIntroAnimateDone) {
      // Limits top, left and right bound
      if (this.y < topBound) {
        this.y = topBound;
        this.gravitySpeed = 0;
      } 
      if (this.x > rightBound) {
        this.x = rightBound;
        this.speedX = 0;
      } 
      if (this.x < leftBound) {
        this.x = leftBound;
        this.speedX = 0;
      }
    }
  }
}

function updateGameArea() {
  gameArea.clear();
  var speedX = -1.56;
  if((gameBackgrounds[7].x + (gameBackgrounds[7].width * 0.45)) > gameArea.canvas.width/2) {
    for(x = 3; x < gameBackgrounds.length; x++) {
      gameBackgrounds[x].speedX = speedX;
      if(x < 7)
        speedX -= 0.03;
    }
    
    for(x = 0; x < gameBackgrounds.length; x++)
      if(x != 1 && x != 2)
        gameBackgrounds[x].newPos();
    introAnimate = false;
  } else {
    introAnimate = true;
  }

  // Background Clouds Speed & Update Position
  speedX = 0.28;
  for(x = 1; x <= 2; x++) {
    gameBackgrounds[x].speedX = speedX;
    gameBackgrounds[x].newPos();
  }

  // Update all background graphics
  for(x = 0; x < gameBackgrounds.length; x++)
    gameBackgrounds[x].update();

  for(x = 0; x < clouds.length; x++) {
    // Set foreground cloud speeds & update all foreground cloud positions & graphics
    clouds[x].speedX = 0.15;
    clouds[x].newPos();  
    clouds[x].update();
  }
  
  // Increment the current frame number for the game area
  gameArea.frameNo += 1;

  if(!playerIntroAnimateDone) {
    player.speedX = 0;
    player.speedY = 0;
    // Update pet speeds if enabled for same reason
    playerPet.speedX = 0;
    playerPet.speedY = 0;
    
    animatePlayerIntro();
    
    player.speedX *= player.friction;
    playerPet.speedX *= player.friction;

    player.newPos();
    player.update();
    // If pet is enabled, update position and graphics
    playerPet.newPos();
    playerPet.update();
  } else if (introAnimate) {
    // Set player speeds to 0 each frame to move only speed amount each frame
    // invoked by buttonpress
    player.speedX = 0;
    player.speedY = 0;
    // Update pet speeds if enabled for same reason
    playerPet.speedX = 0;
    playerPet.speedY = 0;
    
    // If game is on, check for buttonpress
    if(gameArea.interval)
      checkButtonPress();
    // If player is falling, add gravity speeds
    if(player.falling) {
      if(gameArea.frameNo % .5 == 0)
        player.gravitySpeed += player.gravity * (player.gravity * .01);
    }

    // Same for pet, if pet is enabled
    if(playerPet.falling) {
      if(gameArea.frameNo % .5 == 0)
        playerPet.gravitySpeed += player.gravity * (player.gravity * .01);
    }

    // Implement friction effect on player/pet speed
    player.speedX *= player.friction;
    playerPet.speedX *= player.friction;

    // Low Gravity Fun
    // if(player.x < gameArea.canvas.width / 3 * 2) {
    //   player.gravity = 9.8;
    // } else {
    //   player.gravity = 9.8 / 5 * 3;
    // }
    // if(player.x < gameArea.canvas.width / 3 * 2) {
    //   playerPet.gravity = 9.8;
    // } else {
    //   playerPet.gravity = 9.8 / 5 * 3;
    // }

    // Update player position after all movements have been made and update graphics
    player.newPos();
    player.update();
    // If pet is enabled, update position and graphics
    playerPet.newPos();
    playerPet.update();
  }
  // If intro animation is done, begin logo animation
  if(introAnimate && !introAnimateDone) {//&& !introAnimateDone) {
    startMenu();
    introAnimateDone = true;
  } else if (introAnimateDone && !logoAnimateDone && timers[1].counter > 2) {
    gameLogo.update();
    animateLogo();
  } else if (introAnimateDone) {
    if(event.clientX >= startButton.x && event.clientX <= startButton.x + startButton.width && event.clientY >= startButton.y && event.clientY <= startButton.y + 50){
        startButton.color='resources/buttons/Start-Button-Pressed.png';
    }
    gameLogo.update();
    startButton.update();
    settingsButton.update();
    exitButton.update();
  }

  //   gameMenu.x = sparkle.x;
  //   startMenu();
  // }

  // Reset max Y (height) if the speed is set to 0. Catches apex of jump to calculate
  // max Y height for jump
  if(precisionRound(player.speedY,0) < 0)
    player.maxY = precisionRound(player.y, 0);
  
  // player.animate(player.lastDirection);

  // Update each label to relevant information each frame
  updateLabels();
}

function animatePlayerIntro() {
  player.speedX = (player.speed / 3) ;
  playerPet.speedX = (player.speed / 3);
  player.lastDirection = 1;
  playerPet.lastDirection = 1;
  if(gameArea.frameNo % 5 == 0) {
    player.stepCount++;
    playerPet.stepCount++;
  }
  player.animateCharacter(player.lastDirection, 'characters/Wizard/PNG/Wizard');
  playerPet.animateCharacter(playerPet.lastDirection, 'npc/Duck');
  if(introAnimate)
    playerIntroAnimateDone = true;
}

function checkButtonPress() {
  // If pressing Left Arrow Key
  if (gameArea.keysdown && gameArea.keysdown[37] && !gameArea.keysdown[16]) {
    player.speedX -= player.speed;
    playerPet.speedX -= player.speed;
    player.lastDirection = 0;
    playerPet.lastDirection = 0;
    if(gameArea.frameNo % 10 == 0) {
      player.stepCount++;
      playerPet.stepCount++;
    }
  } else 

  // If pressing Shift + Left Arrow Key
  if (gameArea.keysdown && gameArea.keysdown[37] && gameArea.keysdown[16]) {
    player.speedX -= (player.speed * 1.5);
    playerPet.speedX -= (player.speed * 1.5);
    player.lastDirection = 0;
    playerPet.lastDirection = 0;
    if(gameArea.frameNo % 5 == 0) {
      player.stepCount++;
      playerPet.stepCount++; 
    }
  }

  // Reset animation to 'standing' step count so character isn't standing still
  // with the walk animation
  if (!gameArea.keysdown[37] && !gameArea.keysdown[39] ) {
    // player.lastDirection = 2;
    player.stepCount = 0;
    playerPet.stepCount = 0;
  }
  // If pressing Right Arrow Key
  if (gameArea.keysdown && gameArea.keysdown[39] && !gameArea.keysdown[16]) {
    player.speedX += player.speed;
    playerPet.speedX += player.speed;
    player.lastDirection = 1;
    playerPet.lastDirection = 1;
    // player.animate(player.lastDirection);
    if(gameArea.frameNo % 10 == 0){
      player.stepCount++;
      playerPet.stepCount++;
    }
  } else 
  // If pressing Shift + Right Arrow Key
  if (gameArea.keysdown && gameArea.keysdown[39] && gameArea.keysdown[16]) {
    player.speedX += (player.speed * 1.5) ;
    playerPet.speedX += (player.speed * 1.5);
    player.lastDirection = 1;
    playerPet.lastDirection = 1;
    if(gameArea.frameNo % 5 == 0) {
      player.stepCount++;
      playerPet.stepCount++;
    }
  }
  
  // If pressing Space Key (Fire)
  if ( gameArea.keysdown && gameArea.keysdown[32] ) {
    player.fireCount = 1;
  }
  // If releasing Space Key (Fire)
  if ( gameArea.keysup[32] ) {
    fire();
  }

  // If pressing up key
  if (gameArea.keysdown && gameArea.keysdown[38]) {
    if (!player.falling) {
      jump(20);
    } 
    if (player.falling && player.doubleJump == 1 ) {
      jump(20);
      player.doubleJump++;
    }
  }

  // Releasing up key
  if ( player.jumped && player.falling && gameArea.keysup[38] ) {
      if(player.doubleJump < 2) {
        player.doubleJump = 1;
      }
  }

  player.animateCharacter(player.lastDirection, 'characters/Wizard/PNG/Wizard');
  playerPet.animateCharacter(playerPet.lastDirection, 'npc/Duck')
}

function startGameButton() {
  if(!gameArea.interval) {gameArea.interval = setInterval(updateGameArea, 20);}
}

function animateIntro() {
  if(introAnimate) {
    // console.log("finished intro");
    // sparkle.moveAngle = 1;
    if(sparkle.width < 25 && !sparkWidthReached) {
      var angle = 10;
      if(gameArea.frameNo % 3 == 0 ){
        sparkle.x = gameBackgrounds[6].x + gameBackgrounds[6].width/4*2;
        sparkle.width += 1;
        sparkle.height += 1;
        angle -= .5;
        sparkle.moveAngle = angle;
        sparkle.newPos();
      }
    } else if (sparkle.width > 0) {
      sparkWidthReached = true;
      var angle = 1;
      if(gameArea.frameNo % 2 == 0 ){
        sparkle.x = gameBackgrounds[6].x + gameBackgrounds[6].width/4*2;
        sparkle.width -= .5;
        sparkle.height -= .5;
        angle += 3;
        sparkle.moveAngle = angle;
        sparkle.newPos();
      } 
    } else if (sparkle.width <= 0 && sparkWidthReached) {
        introAnimateDone = true; 
    }
    sparkle.updateStar();
  }
  introAnimate = false;
}

function startMenu() {
  startButton = new component(300, 0, 'resources/buttons/Start-Button.png', (gameArea.canvas.width / 2) - 150, gameArea.canvas.height, "image");
  settingsButton = new component(300, 0, 'resources/buttons/Settings-Button.png', (gameArea.canvas.width / 2) - 150, gameArea.canvas.height, "image");
  exitButton = new component(300, 0, 'resources/buttons/Exit-Button.png', (gameArea.canvas.width / 2) - 150, gameArea.canvas.height, "image");
  gameLogo = new component(300, 60, 'resources/SVG/Goblet-Pixel-Logo-2.svg', (gameArea.canvas.width / 2) - 150, gameArea.canvas.height / 3, "image");

  if(gameLogo.width < 400) {
    gameLogo.width += 8;
    gameLogo.x -= 4;
    gameLogo.height += 2;
    gameLogo.y -= 2.5;
  }
  gameLogo.update();
  timers.push({ delay: 1000, nextFireTime: 0, doFunction: doTimers, counter: 0 });
  console.log("startMenu()");
}

function animateLogo() {
  console.log("animateLogo()");
  // logoAnimateDone = true;
  if(startButton.height < 75) {
    gameLogo.y -= 3;
    startButton.height += 2;
    startButton.y -= 9;
    settingsButton.height += 2;
    settingsButton.y -= 6.75;
    exitButton.height += 2;
    exitButton.y -= 4.5;
    startButton.update();
    settingsButton.update();
    exitButton.update();
  }
  else {
    console.log("done");
    logoAnimateDone = true;
  }
}

function jump(i) {
  player.lowestY = precisionRound(player.y, 0);
  player.gravitySpeed = 0;
  player.speedY = 0;

  player.gravitySpeed -= i;
  player.falling = true;
  player.jumped = true;

  playerPet.gravitySpeed = 0;
  playerPet.speedY = 0;
  playerPet.gravitySpeed -= i;
  // Low Gravity Fun
  // if(player.x < gameArea.canvas.width / 3 * 2) {
  //   playerPet.gravitySpeed -= i;
  // } else {
  //   playerPet.gravitySpeed -= i/5*3;
  // }
  playerPet.falling = true;
  playerPet.jumped = true;
  console.log("jumped");
}

function fire() {
  // Using fireCount to only fire one projectile per press of the fire key (Space key)
  if(player.fireCount == 1) {
    player.fire();
  }
  player.fireCount = 0;
}

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

function updateLabels() {
  // Column 1 Labels
  document.getElementById('label2').innerHTML = "Player Score: " + precisionRound(playerScore, 0);
  document.getElementById('label3').innerHTML = "Player X: " + precisionRound(player.x, 0);
  document.getElementById('label4').innerHTML = "Player Y: " + precisionRound(player.y, 0);
  document.getElementById('label5').innerHTML = "Player SpeedX: " + precisionRound(player.speedX, 1);
  document.getElementById('label6').innerHTML = "Player SpeedY: " + precisionRound(player.speedY, 0);
  document.getElementById('label7').innerHTML = "Player File: " + player.image.src;
  // Column 2 Labels
  document.getElementById('label8').innerHTML = "Player Gravity: " + player.gravity;
  document.getElementById('label9').innerHTML = "Player Gravity Speed: " + precisionRound(player.gravitySpeed, 1);
  document.getElementById('label10').innerHTML = "Player Direction Faced: " + player.checkDirection();
  document.getElementById('label11').innerHTML = "Player Double Jump Value: " + player.doubleJump;
  document.getElementById('label12').innerHTML = "Max Y: " + player.maxY;
  document.getElementById('label13').innerHTML = "Low Y: " + player.lowestY;
  document.getElementById('label14').innerHTML = "Player Step Count: " + player.stepCount;
  document.getElementById('label15').innerHTML = "Projectile Count: " + player.projectiles.length;

}
