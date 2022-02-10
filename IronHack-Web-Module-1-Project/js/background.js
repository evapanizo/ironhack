'use strict'

class Background {

  constructor (canvas) {
    const self = this;
    // Canvas
    self.ctx = canvas.getContext('2d');
    // Images
    self.firstImage = new Image();
    self.firstImage.src = "images/background.png"
    self.secondImage = new Image(); 
    self.firstImage.src = "images/background.png"
    // Positions
    self.x = 0;
    self.firstY = 0;
    self.secondY = canvas.height * -1;
    // Speed
    self.speed = 2;
  }
   
  // Update background position
  update () {
    const self = this;
    self.firstY += self.speed;
    self.secondY += self.speed;
    if (self._outOfLimits(self.firstY)) {
      self.firstY = (self.ctx.canvas.height * -1) + self.speed;
    }
    if (self._outOfLimits(self.secondY)) {
      self.secondY = (self.ctx.canvas.height * -1) + self.speed;
    }
  }

  // Check if background is out of canvas y limits
  _outOfLimits (yPosition) {
    const self = this;
    return yPosition > self.ctx.canvas.height;
  }

  // Render both images
  render () {
    const self = this;
    self.ctx.drawImage(self.firstImage, 0, 0, 600, 650, self.x, self.firstY , self.ctx.canvas.width, self.ctx.canvas.height);
    self.ctx.drawImage(self.firstImage, 0, 0, 600, 650, self.x, self.secondY , self.ctx.canvas.width, self.ctx.canvas.height);
  }
}

