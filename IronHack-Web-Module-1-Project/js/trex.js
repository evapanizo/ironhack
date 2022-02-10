'use strict'

class Trex {

  constructor (canvas){
    const self = this;
    // Canvas
    self.ctx = canvas.getContext('2d');
    // Size
    self.height = 0.18 * canvas.height;             
    self.width = 0.15 * canvas.width;
    // Image
    self.trexImg = new Image();
    self.trexImg.src = "images/dino-3.png"
    // Position
    self.xposition = canvas.width;
    self.yposition = (canvas.height / 3);
    // Movement
    self.direction = -1;
    self.speed = canvas.width * 0.003;        
    // Easter Egg Flags
    self.easterEgg = true;
    self.renderEasterEgg = false; 
    // Audio
    self.trexSound = new Audio("audio/trex-sound.mp3");
    self.eatSound = new Audio("audio/eat-sound.mp3"); 
    self.soundFlag = true;                 
  }

  // Render T-Rex
  render () {
    const self = this;
    self.ctx.drawImage(self.trexImg, 0, 0, 328, 407, self.xposition, self.yposition , self.width, self.height);
  }

  // Update T-Rex position if next position is not out of x limits
  updatePosition () {
    const self = this;
    const newXPosition = self.xposition + (self.direction * self.speed);
    if (!self._isOutOfLimits(newXPosition)) {
      self.xposition = newXPosition;
    } else {
      self.renderEasterEgg = false;
      self.easterEgg = false;
    }
  }

  // Return true if T-Rex is out of x limits
  _isOutOfLimits (xposition) {
    const self = this;
    const leftLimit = xposition + self.width < 0;
    if (leftLimit) {
      return true;
    }
    return false;
  }

  // Plays the T-rex sound
  sound () {
    const self = this;
    if(self.soundFlag){
      self.trexSound.play();
      self.soundFlag = false;
    }
  }

  // Checks if T-rex has collided with an object
  checkCollision (object) {
    const self = this;
    const collideTop = self.yposition < object.yposition + object.height;
    const collideRight = self.xposition < object.xposition + object.width;
    const collideLeft = self.xposition + self.width > object.xposition;
    const collideBottom = self.yposition + self.height > object.yposition;
    if (collideTop && collideLeft && collideRight && collideBottom){
      return true;
    }
    return false;
  }

  // Plays a squish sound when there is a collision with a crab
  crabCollisionSound () {
    const self = this;
    self.eatSound.play();
    self.eatSound.volume = 0.8;
  }
}