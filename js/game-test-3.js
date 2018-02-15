var player;
var playerScore = 0;
var sky;
var clouds1;
var clouds2;
var treeline1;
var treeline2;
var treeline3;
var treeline4;
var treeline4;
var tower;

function startGame() {
    // Making Player
    player = new component(40, 40, 'resources/characters/Wizard-right-2.png', 225, 225, "player");
    // player = new characterComponent(40, 40, 'resources/characters/Wizard-right-2.png', 10, 470, "player", true, 1, 3, 0, true);

    // Making Background
    sky = new component(window.innerWidth - 30, (window.innerHeight/6) * 5, 'resources/backgrounds/Background-sky-large.png', 0, 0, "image");
    clouds1 = new component(window.innerWidth - 30, (window.innerHeight/6) * 5, 'resources/backgrounds/foreground-clouds-large.png', 0, 0, "image");
    // clouds1 = new component(window.innerWidth - 30, (window.innerHeight/6) * 5, 'resources/backgrounds/foreground-clouds-large.png', 0, 0, "image");
    clouds2 = new component(1005, (window.innerHeight/6) * 5, 'resources/backgrounds/foreground-clouds-large.png', -100, -80, "background");
    treeline1 = new component(1005, (window.innerHeight/6) * 5, 'resources/backgrounds/Background-trees+grass-large-single-row.png', 0, -80, "background");
    treeline2 = new component(1005, (window.innerHeight/6) * 5, 'resources/backgrounds/Background-trees+grass-large-single-row.png', 30, -70, "background");
    treeline3 = new component(1005, (window.innerHeight/6) * 5, 'resources/backgrounds/Background-trees+grass-large-single-row.png', -10, -60, "background");
    tower = new component(95, 285, 'resources/backgrounds/Wizard-Tower.png', window.innerWidth - 285, window.innerHeight - 550, "image");
    treeline4 = new component(1005, (window.innerHeight/6) * 5, 'resources/backgrounds/Background-trees+grass-large-single-row.png', 20, -50, "background");
    treeline5 = new component(1005, (window.innerHeight/6) * 5, 'resources/backgrounds/Background-trees+grass-large-single-row.png', -30, -40, "background");
    gameArea.start();
}

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        // leaves margin of 15 px on each side of gamearea
        this.canvas.width = window.innerWidth - 30;
        // 2/3 height of window
        this.canvas.height = (window.innerHeight / 3) * 2;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            gameArea.keys = (gameArea.keys || []);
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        })
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
    if(type == "image" || type == "background" || type == "player") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.angle = 0;
    this.moveAngle = 0;
    this.x = x;
    this.y = y;
    this.updateBackground = function() {
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
    this.update = function() {
        ctx = gameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        if(type == "player"){
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
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speedY * Math.sin(this.angle);
        this.y -= this.speedY * Math.cos(this.angle);
        if(this.type == "background") {
          if(this.x == -(this.width)) {
            this.x = 0;
          }
        }  
    }

    this.animateCharacter = function(i) {
        characterLeft1 = new Image();
        characterLeft2 = new Image();
        characterLeft3 = new Image();
        characterLeft = [];
        characterLeft.push('resources/characters/Wizard-left-1.png');
        characterLeft.push('resources/characters/Wizard-left-2.png');
        characterLeft.push('resources/characters/Wizard-left-3.png');
        characterLeft1.src = characterLeft[0];
        characterLeft2.src = characterLeft[1];
        characterLeft3.src = characterLeft[2];

        characterRight1 = new Image();
        characterRight2 = new Image();
        characterRight3 = new Image();
        characterRight = [];
        characterRight.push('resources/characters/Wizard-right-1.png');
        characterRight.push('resources/characters/Wizard-right-2.png');
        characterRight.push('resources/characters/Wizard-right-3.png');
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

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

function updateGameArea() {
    gameArea.clear();
    sky.newPos();
    sky.updateBackground();
    clouds1.speedX = -0.25;
    clouds1.newPos();
    clouds1.updateBackground();
    player.moveAngle = 0;
    player.speedX = 0;
    player.speedY = 0;
    if (gameArea.keys && gameArea.keys[37]) {player.moveAngle = -1; }
    if (gameArea.keys && gameArea.keys[39]) {player.moveAngle = 1; }
    if (gameArea.keys && gameArea.keys[38]) {player.speedY= 1; }
    if (gameArea.keys && gameArea.keys[40]) {player.speedY= -1; }
    player.newPos();
    player.update();
    updateLabels();
}

function updateLabels() {
  // document.getElementById('label1').innerHTML = "Timer: " + "0" + " with " + timers[0].delay + "ms delay has fired " + (++timers[0].counter) + " times.";
  document.getElementById('label2').innerHTML = "Player Score: " + precisionRound(playerScore, 0);
  document.getElementById('label3').innerHTML = "Player X: " + precisionRound(player.x, 0);
  document.getElementById('label4').innerHTML = "Player Y: " + precisionRound(player.y, 0);
  document.getElementById('label5').innerHTML = "Player SpeedX: " + precisionRound(player.speedX, 0);
  document.getElementById('label6').innerHTML = "Player SpeedY: " + precisionRound(player.speedY, 0);
  // document.getElementById('label7').innerHTML = "Player Image: " + player.image.src;
  document.getElementById('label8').innerHTML = "Player Gravity: " + player.gravity;
  document.getElementById('label9').innerHTML = "Player Gravity Speed: " + precisionRound(player.gravitySpeed, 1);
  // document.getElementById('label10').innerHTML = "Player Direction Faced: " + player.checkDirection();
  document.getElementById('label11').innerHTML = "Player Double Jump Value: " + player.doubleJump;
  document.getElementById('label12').innerHTML = "Max Y: " + player.maxY;
  document.getElementById('label13').innerHTML = "Low Y: " + player.lowestY;
  document.getElementById('label14').innerHTML = "Player Step Count: " + player.stepCount;
}