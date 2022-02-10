'use strict'

class Life {

  constructor (canvas) {
    const self = this;
    // Canvas
    self.ctx = canvas.getContext('2d');
    // Size
    self.width = canvas.width * 0.05;
    self.height = canvas.width * 0.05;
    //Image
    self.airImg = new Image();
    self.airImg.src = "images/air.png"
    // Position
    self.xposition = Math.random() * canvas.width * 0.9;
    self.yposition = 0;
    // Movement
    self.yspeed = canvas.height * 0.003;        
  }

  // Render life
  render () {
    const self = this;
    self.ctx.drawImage(self.airImg, 0, 0, 457, 467, self.xposition, self.yposition , self.width, self.height);
  }

  // Update life position
  updatePosition () {
    const self = this;
    self.yposition += self.yspeed;
  }

  // Return true if life has been avoided
  isAvoided () {
    const self = this;
    return self.yposition > self.ctx.canvas.height;
  }
}