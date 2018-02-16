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
