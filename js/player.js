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

