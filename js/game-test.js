var playerCharacter;
var playerPet;
var gameAreaBackgrounds = [];
var clouds = [];

var sparkWidthReached = false;
var introAnimate = false;
var introAnimateDone = false;
var sparkle
var playerScore = 0;
var gameInfo;
var gameLogo;
var gameMenu;
var obstacles = [];
var timers = [];

timers.push({ delay: 100, nextFireTime: 0, doFunction: doTimers, counter: 0 });

function timerLoop(currentTime) {
  requestAnimationFrame(timerLoop);
  for(var i = 0; i < timers.length; i++) {
    if(currentTime > timers[i].nextFireTime){
      var t = timers[i];
      t.nextFireTime = currentTime + t.delay;
      t.doFunction(t, i);
    }
  }
}

function doTimers(t,i){ 
  // gameArea.context.clearRect(0, 100, gameArea.width, 20)
  // gameArea.context.fillText('Timer# ' + i + ' with ' + t.delay + 'ms delay has fired ' + (++t.counter) + ' times.', 20, 100 + 20*i);
  if((t.counter)/10 % 1 == 0){
    document.getElementById("label1").innerHTML = 'Timer: ' + precisionRound((t.counter)/10, 1) + '.0 (' + t.delay + 'ms)';
  } else{
    document.getElementById("label1").innerHTML = 'Timer: ' + precisionRound((t.counter)/10, 1) + ' (' + t.delay + 'ms)';
  }
  t.counter++;
  // console.log(precisionRound(t.counter/10, 0));
}

function startGame() {
  //            function component(width, height, color, x, y, type, falling, direction, speed, score, canDoubleJump)

  // Sky
  gameAreaBackgrounds.push(new component(1005, (window.innerHeight/6) * 5, 'resources/backgrounds/Background-sky-large.png', 0, 0, "background"));
  // Foreground clouds - background layer
  gameAreaBackgrounds.push(new component(1005, (window.innerHeight/6) * 5, 'resources/backgrounds/foreground-clouds-large.png', 0, -30, "background"));
  gameAreaBackgrounds.push(new component(1005, (window.innerHeight/6) * 5, 'resources/backgrounds/foreground-clouds-large.png', -100, -80, "background"));
  // Rows of trees to create depth
  gameAreaBackgrounds.push(new component(1005, (window.innerHeight/6) * 5, 'resources/backgrounds/Background-trees+grass-large-single-row.png', 0, -80, "background"));
  gameAreaBackgrounds.push(new component(1005, (window.innerHeight/6) * 5, 'resources/backgrounds/Background-trees+grass-large-single-row.png', 30, -70, "background"));
  gameAreaBackgrounds.push(new component(1005, (window.innerHeight/6) * 5, 'resources/backgrounds/Background-trees+grass-large-single-row.png', -10, -60, "background"));
  // Wizard Tower
  gameAreaBackgrounds.push(new component(576/2, 576/2, 'resources/Wizzard_Tower.gif', window.innerWidth - 285, window.innerHeight - 580, "image"));
  // More trees in front of tower
  gameAreaBackgrounds.push(new component(1005, (window.innerHeight/6) * 5, 'resources/backgrounds/Background-trees+grass-large-single-row.png', 20, -50, "background"));
  gameAreaBackgrounds.push(new component(1005, (window.innerHeight/6) * 5, 'resources/backgrounds/Background-trees+grass-large-single-row.png', -30, -40, "background"));
  // Add low level foreground clouds 
  for(x = 0; x < 30; x++)
    clouds.push(new component(23, 8, 'resources/backgrounds/single-cloud.png', 4 * (Math.floor(Math.random() * Math.floor(gameArea.canvas.width * 2))), 2 * (Math.floor(Math.random() * Math.floor(gameArea.canvas.height))), "background"));
  
  // Add Player's character
  playerCharacter = new characterComponent(50, 50, 'resources/characters/Wizard-right-2.png', 20, 408, "player", true, 1, 3, 0, true);
  // Add Pet character
  playerPet = new characterComponent(30, 35, 'resources/npc/Duck-right-2.png', 8, 470, "image", true, 1, 3, 0, true);
  // Set Player's gravity; also is pet's gravity
  playerCharacter.gravity = 9.8;

  window.addEventListener('keydown', function keyPress(e) {
    gameArea.key = e.keyCode;
    if(gameArea.key == 65 && !gameArea.interval) {
      requestAnimationFrame(timerLoop);
      gameArea.interval = setInterval(updateGameArea, 20);
    }
  })
  
  // playerScore = new component("30px", "Consolas", "black", 280, 40, "text", false);
  gameArea.start();
  // if(gameArea.keys && gameArea.keys[32] && !gameArea.interval) {
  //   gameArea.interval = setInterval(updateGameArea, 20);
  // } 
  console.log("started");
}


var gameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    sparkle = new component(0, 0, 'resources/sparkle.png', gameAreaBackgrounds[6].x + 35, gameAreaBackgrounds[6].y + 20, "image");
    gameMenu = new component(0, 0, 'resources/settings-template.png', sparkle.x, sparkle.y, "image");
    // Game Area is full width of window - 20px to allow 10px margin on each side 
    // for centering
    this.canvas.width = window.innerWidth - 30;
    // Game Area is 2/3 height of window
    this.canvas.height = (window.innerHeight / 3) * 2; 
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    window.addEventListener('keydown', function keyPress(e) {
      gameArea.keysdown = (gameArea.keysdown || []);
      gameArea.keysup = (gameArea.keysup || []);
      // gameArea.keys[e.keyCode] = (e.type == "keydown");
      gameArea.keysdown[e.keyCode] = true;
      gameArea.keysup[e.keyCode] = false;
    })
    window.addEventListener('keyup', function (e) {
      // gameArea.keys[e.keyCode] = (e.type == "keydown");
      gameArea.keysdown[e.keyCode] = false;
      gameArea.keysup[e.keyCode] = true;
    })
    // gameInfo.text = "Controls:";
    // gameInfo.update();
    updateGameArea();
  },
  stop : function() {
    clearInterval(this.interval);
  }, 
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image" || type == "background") {
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
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        if (type == "background") {
            ctx.drawImage(this.image, 
                this.x + this.width, 
                this.y,
                this.width, this.height);
        }
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
    characterLeft1 = new Image();
    characterLeft2 = new Image();
    characterLeft3 = new Image();
    characterLeft = [];
    characterLeft.push('resources/' + path + '-left-1.png');
    characterLeft.push('resources/' + path + '-left-2.png');
    characterLeft.push('resources/' + path + '-left-3.png');
    characterLeft1.src = characterLeft[0];
    characterLeft2.src = characterLeft[1];
    characterLeft3.src = characterLeft[2];

    characterRight1 = new Image();
    characterRight2 = new Image();
    characterRight3 = new Image();
    characterRight = [];
    characterRight.push('resources/' + path + '-right-1.png');
    characterRight.push('resources/' + path + '-right-2.png');
    characterRight.push('resources/' + path + '-right-3.png');
    characterRight1.src = characterRight[0];
    characterRight2.src = characterRight[1];
    characterRight3.src = characterRight[2];

    if(this.stepCount > 2)
      this.stepCount = 0;
    if(i == 1) {
      switch(this.stepCount) {
        case 1:
          this.image = characterRight3;
          break;
        case 2:
          this.image = characterRight1;
          break;
        default:
          this.image = characterRight2;
          break;
      }
    } else if(i == 0){
      switch(this.stepCount) {
        case 1:
          this.image = characterLeft3;
          break;
        case 2:
          this.image = characterLeft1;
          break;
        default:
          this.image = characterLeft2;
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

function updateGameArea() {
  gameArea.clear();
  if((gameAreaBackgrounds[6].x + (gameAreaBackgrounds[6].width/2)) > gameArea.canvas.width/2) {
    gameAreaBackgrounds[3].speedX = -0.56;
    gameAreaBackgrounds[4].speedX = -0.58;
    gameAreaBackgrounds[5].speedX = -0.59;
    gameAreaBackgrounds[6].speedX = -0.6;
    gameAreaBackgrounds[7].speedX = -0.63;
    gameAreaBackgrounds[8].speedX = -0.66;
    
    for(x = 0; x < gameAreaBackgrounds.length; x++)
      if(x != 1 && x != 2)
        gameAreaBackgrounds[x].newPos();
    introAnimate = false;
  } else {
    introAnimate = true;
  }

  // Background Clouds Speed & Update Position
  gameAreaBackgrounds[1].speedX = -0.12;
  gameAreaBackgrounds[2].speedX = -0.18;
  gameAreaBackgrounds[1].newPos();
  gameAreaBackgrounds[2].newPos();

  // Update all background graphics
  for(x = 0; x < gameAreaBackgrounds.length; x++)
    gameAreaBackgrounds[x].update();

  // Set foreground cloud speeds
  for(x = 0; x < clouds.length; x++)
    clouds[x].speedX = -0.15;
  // Update all foreground cloud positions
  for(x = 0; x < clouds.length; x++)
    clouds[x].newPos();  
  // Update all foreground cloud graphics
  for(x = 0; x < clouds.length; x++)
    clouds[x].update();

  // Increment the current frame number for the game area
  gameArea.frameNo += 1;

  // Set player speeds to 0 each frame to move only speed amount each frame
  // invoked by buttonpress
  playerCharacter.speedX = 0;
  playerCharacter.speedY = 0;
  // Update pet speeds if enabled for same reason
  playerPet.speedX = 0;
  playerPet.speedY = 0;
  
  // If game is on, check for buttonpress
  if(gameArea.interval)
    checkButtonPress();
  // If player is falling, add gravity speeds
  if(playerCharacter.falling) {
    if(gameArea.frameNo % .5 == 0)
      playerCharacter.gravitySpeed += playerCharacter.gravity * (playerCharacter.gravity * .01);
  }

  // Same for pet, if pet is enabled
  if(playerPet.falling) {
    if(gameArea.frameNo % .5 == 0)
      playerPet.gravitySpeed += playerCharacter.gravity * (playerCharacter.gravity * .01);
  }

  // Implement friction effect on player/pet speed
  playerCharacter.speedX *= playerCharacter.friction;
  playerPet.speedX *= playerCharacter.friction;

  // Low Gravity Fun
  // if(playerCharacter.x < gameArea.canvas.width / 3 * 2) {
  //   playerCharacter.gravity = 9.8;
  // } else {
  //   playerCharacter.gravity = 9.8 / 5 * 3;
  // }
  // if(playerCharacter.x < gameArea.canvas.width / 3 * 2) {
  //   playerPet.gravity = 9.8;
  // } else {
  //   playerPet.gravity = 9.8 / 5 * 3;
  // }

  // Update player position after all movements have been made and update graphics
  playerCharacter.newPos();
  playerCharacter.update();
  // If pet is enabled, update position and graphics
  playerPet.newPos();
  playerPet.update();

  // If intro animation is done, begin sparkle + logo animation
  if(introAnimate && !introAnimateDone) {
    animateIntro();
  } else if (introAnimateDone) {
    gameMenu.x = sparkle.x;
    startMenu();
  }

  // Reset max Y (height) if the speed is set to 0. Catches apex of jump to calculate
  // max Y height for jump
  if(precisionRound(playerCharacter.speedY,0) < 0)
    playerCharacter.maxY = precisionRound(playerCharacter.y, 0);
  
  // playerCharacter.animate(playerCharacter.lastDirection);

  // Update each label to relevant information each frame
  updateLabels();
}

function checkButtonPress() {
  // If pressing Left Arrow Key
  if (gameArea.keysdown && gameArea.keysdown[37] && !gameArea.keysdown[16]) {
    playerCharacter.speedX -= playerCharacter.speed;
    playerPet.speedX -= playerCharacter.speed;
    playerCharacter.lastDirection = 0;
    playerPet.lastDirection = 0;
    if(gameArea.frameNo % 10 == 0) {
      playerCharacter.stepCount++;
      playerPet.stepCount++;
    }
  } else 

  // If pressing Shift + Left Arrow Key
  if (gameArea.keysdown && gameArea.keysdown[37] && gameArea.keysdown[16]) {
    playerCharacter.speedX -= (playerCharacter.speed * 1.5);
    playerPet.speedX -= (playerCharacter.speed * 1.5);
    playerCharacter.lastDirection = 0;
    playerPet.lastDirection = 0;
    if(gameArea.frameNo % 5 == 0) {
      playerCharacter.stepCount++;
      playerPet.stepCount++; 
    }
  }

  // Reset animation to 'standing' step count so character isn't standing still
  // with the walk animation
  if (!gameArea.keysdown[37] && !gameArea.keysdown[39] ) {
    // playerCharacter.lastDirection = 2;
    playerCharacter.stepCount = 0;
    playerPet.stepCount = 0;
  }
  // If pressing Right Arrow Key
  if (gameArea.keysdown && gameArea.keysdown[39] && !gameArea.keysdown[16]) {
    playerCharacter.speedX += playerCharacter.speed;
    playerPet.speedX += playerCharacter.speed;
    playerCharacter.lastDirection = 1;
    playerPet.lastDirection = 1;
    // playerCharacter.animate(playerCharacter.lastDirection);
    if(gameArea.frameNo % 10 == 0){
      playerCharacter.stepCount++;
      playerPet.stepCount++;
    }
  } else 
  // If pressing Shift + Right Arrow Key
  if (gameArea.keysdown && gameArea.keysdown[39] && gameArea.keysdown[16]) {
    playerCharacter.speedX += (playerCharacter.speed * 1.5) ;
    playerPet.speedX += (playerCharacter.speed * 1.5);
    playerCharacter.lastDirection = 1;
    playerPet.lastDirection = 1;
    if(gameArea.frameNo % 5 == 0) {
      playerCharacter.stepCount++;
      playerPet.stepCount++;
    }
  }
  
  // If pressing Space Key (Fire)
  if ( gameArea.keysdown && gameArea.keysdown[32] ) {
    fire();
  }

  // If pressing up key
  if (gameArea.keysdown && gameArea.keysdown[38]) {
    if (!playerCharacter.falling) {
      jump(25);
    } 
    if (playerCharacter.falling && playerCharacter.doubleJump == 1 ) {
      jump(25);
      playerCharacter.doubleJump++;
    }
  }

  // Releasing up key
  if ( playerCharacter.jumped && playerCharacter.falling && gameArea.keysup[38] ) {
      if(playerCharacter.doubleJump < 2) {
        playerCharacter.doubleJump = 1;
      }
  }

  playerCharacter.animateCharacter(playerCharacter.lastDirection, 'characters/Wizard');
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
        sparkle.x = gameAreaBackgrounds[6].x + gameAreaBackgrounds[6].width/4*2;
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
        sparkle.x = gameAreaBackgrounds[6].x + gameAreaBackgrounds[6].width/4*2;
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
  gameLogo = sparkle;
  // gameMenu = sparkle;
  gameLogo.image.src = 'resources/goblet-logo.png';
  // gameMenu.image.src = 'resources/settings-template.png';
  if(gameLogo.width < 400) {
    gameLogo.width += 8;
    // gameMenu.width += 8;
    gameLogo.x -= 4;
    // gameMenu.x -= 4;
    gameLogo.height += 2;
    // gameMenu.height += 4;
    gameLogo.y -= 2.5;
    // gameMenu.y += 5;
  }
  gameLogo.update();
  // if(gameMenu.width < 400) {
  //   gameMenu.image.src = 'resources/settings-template.png';
  //   gameMenu.width += 8;
  //   gameMenu.height += 6;
  //   gameMenu.y += .25;
  // }
  
  // gameMenu.update();
}

function jump(i) {
  playerCharacter.lowestY = precisionRound(playerCharacter.y, 0);
  playerCharacter.gravitySpeed = 0;
  playerCharacter.speedY = 0;
  playerCharacter.gravitySpeed -= i;
  // Low Gravity Fun
  // if(playerCharacter.x < gameArea.canvas.width / 3 * 2) {
  //   playerCharacter.gravitySpeed -= i;
  // } else {
  //   playerCharacter.gravitySpeed -= i/5*3;
  // }
  playerCharacter.falling = true;
  playerCharacter.jumped = true;

  playerPet.gravitySpeed = 0;
  playerPet.speedY = 0;
  playerPet.gravitySpeed -= i;
  // Low Gravity Fun
  // if(playerCharacter.x < gameArea.canvas.width / 3 * 2) {
  //   playerPet.gravitySpeed -= i;
  // } else {
  //   playerPet.gravitySpeed -= i/5*3;
  // }
  playerPet.falling = true;
  playerPet.jumped = true;
  // playerCharacter.checkSpeed();
  // playerCharacter.gravity = n;
  console.log("jumped");
}
function fire() {
  console.log("fire");
}

function moveleft() {
  playerCharacter.speedX = -(this.speed);
}

function moveright() {
  playerCharacter.speedX = this.speed;
}

function clearmove() {
  playerCharacter.speedX = 0;
  playerCharacter.speedY = 0;
}

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

function updateLabels() {
  // document.getElementById('label1').innerHTML = "Timer: " + "0" + " with " + timers[0].delay + "ms delay has fired " + (++timers[0].counter) + " times.";
  document.getElementById('label2').innerHTML = "Player Score: " + precisionRound(playerScore, 0);
  document.getElementById('label3').innerHTML = "Player X: " + precisionRound(playerCharacter.x, 0);
  document.getElementById('label4').innerHTML = "Player Y: " + precisionRound(playerCharacter.y, 0);
  document.getElementById('label5').innerHTML = "Player SpeedX: " + precisionRound(playerCharacter.speedX, 0);
  document.getElementById('label6').innerHTML = "Player SpeedY: " + precisionRound(playerCharacter.speedY, 0);
  document.getElementById('label7').innerHTML = "IntroAnimate & IntroAnimateDone: " + introAnimate + " | " + introAnimateDone;
  document.getElementById('label8').innerHTML = "Player Gravity: " + playerCharacter.gravity;
  document.getElementById('label9').innerHTML = "Player Gravity Speed: " + precisionRound(playerCharacter.gravitySpeed, 1);
  document.getElementById('label10').innerHTML = "Player Direction Faced: " + playerCharacter.checkDirection();
  document.getElementById('label11').innerHTML = "Player Double Jump Value: " + playerCharacter.doubleJump;
  document.getElementById('label12').innerHTML = "Max Y: " + playerCharacter.maxY;
  document.getElementById('label13').innerHTML = "Low Y: " + playerCharacter.lowestY;
  document.getElementById('label14').innerHTML = "Player Step Count: " + playerCharacter.stepCount;
}
