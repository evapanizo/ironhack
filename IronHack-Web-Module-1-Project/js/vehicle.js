'use strict'

class Vehicle {

  constructor (canvas) {
    const self = this;
    // Canvas
    self.ctx = canvas.getContext('2d');
    // Size
    self.height = 0.16 * canvas.height;             
    self.width = 0.13 * canvas.width;
    // Image
    self.carImg = new Image();
    self.carImg.src = "images/car-green.png"
    // Position
    self.xposition = (canvas.width / 2) - (self.width / 2);
    self.yposition = (canvas.height - self.height) - 10;
    // Movement
    self.direction = 0;
    self.speed = 0.04 * canvas.width;  
    self.speedDecrease = 0.007 * canvas.width;                           
    // Health
    self.lives = 4; // Constant
    // Audio
    self.carSound = new Audio("audio/car-horn.mp3"); 
    self.squishSound = new Audio("audio/squish-sound.mp3"); 
    self.blowSound = new Audio("audio/blow-sound.mp3");  
  }

  // Render vehicle
  render () {
    const self = this;
    self.ctx.drawImage(self.carImg, 0, 0, 119, 199, self.xposition, self.yposition , self.width, self.height);
  }

  // Set the direction of the vehicle
  setDirection (direction) {
    const self = this;
    self.direction = direction;
  }

  // Update vehicle position if next position is not out of x limits
  updateXPosition () {
    const self = this;
    const newXPosition = self.xposition + (self.direction * self.speed);
    if (!self._isOutOfXLimits(newXPosition)) {
      self.xposition = newXPosition;
    }
  }

  // Update vehicle position if next position is not out of y limits
  updateYPosition () {
    const self = this;
    const newYPosition = self.yposition + (self.direction * self.speed);
    if (!self._isOutOfYLimits(newYPosition)) {
      self.yposition = newYPosition;
    }
  }

  // Return true if vehicle is out of x limits
  _isOutOfXLimits (xposition) {
    const self = this;
    const leftLimit = xposition < 0;
    const rightLimit = (xposition + self.width) > self.ctx.canvas.width;
    if (leftLimit || rightLimit) {
      return true;
    }
    return false;
  }

  // Return true if vehicle is out of y limits
  _isOutOfYLimits (yposition) {
    const self = this;
    const upperLimit = yposition < 0;
    const bottomLimit = (yposition + self.height) > self.ctx.canvas.height;
    if (upperLimit || bottomLimit) {
      return true;
    }
    return false;
  }

  // Check collision with an object - Returns true if there is a collision.
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

  // Remove a health point from the vehicle and decrease speed
  collision () {
    const self = this;
    self.lives--;
    self.speed -= self.speedDecrease;
  }

  // Add a health point to the vehicle and increse speed;
  oneUp () {
    const self = this;
    self.lives++;
    self.speed += self.speedDecrease;
  }

  // Plays the vehicle sound
  sound () {
    const self = this;
    self.carSound.play();
    self.carSound.volume = 0.15;
  }

  // Plays a squish sound when there is a collision with a crab
  crabCollisionSound () {
    const self = this;
    self.squishSound.play();
    self.squishSound.volume = 0.30;
  }

  // Plays a blow sound when there is a collision with a life
  lifeCollisionSound () {
    const self = this;
    self.blowSound.play();
    self.blowSound.volume = 1;
  }
}