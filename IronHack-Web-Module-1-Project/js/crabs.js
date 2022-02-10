'use strict'

class Crab {

  constructor (canvas, ncrabs) {
    const self = this;
    // Canvas
    self.ctx = canvas.getContext('2d');
    // Size
    self.ncrabs = ncrabs;
    self.height = canvas.height * 0.04;                             
    self.width = canvas.width / self.ncrabs;
    //Image
    self.crabImg = new Image();
    self.crabImg.src = "images/crab.png"
    // Movement
    self.yspeed = canvas.height * 0.003; // Constant value                             
    self.xspeed = canvas.width * 0.0016; 
    self.direction = Math.floor(Math.random() * 3) - 1;
    // Position
    self.xposition = 0;
    self.yposition = 0;
  }

  // Render crab
  render () {
    const self = this;
    self.ctx.drawImage(self.crabImg, 0, 0, 2304, 1545, self.xposition, self.yposition , self.width, self.height);
  }

  // Update crab position if next position is not out of x limits
  updatePosition () {
    const self = this;
    self.yposition += self.yspeed;
    const newXPosition = self.xposition + (self.direction * self.xspeed);
    if (!self._isOutOfLimits(newXPosition)) {
      self.xposition = newXPosition;
    }
  }

  // Return true if crab is out of x limits and change crab direction
  _isOutOfLimits (newXPosition) {
    const self = this;
    const leftLimit = newXPosition < 0;
    const rightLimit = newXPosition + self.width > self.ctx.canvas.width;
    if (leftLimit|| rightLimit) {
      self.direction *= -1;
      return true;
    }
  }

  // Return true if crab has been avoided
  isAvoided () {
    const self = this;
    return self.yposition > self.ctx.canvas.height;
  }
}
