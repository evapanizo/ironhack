function Obstacle(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.ctx;
  this.maxWidth = 200;
  this.minWidth = 20;
  this.width = Math.floor(Math.random() * (this.maxWidth - this.minWidth + 1) + this.minWidth);
  this.height = 15;
  this.greenArea = 40;
  this.minX = this.greenArea;
  this.maxX = this.canvas.width - this.width - this.greenArea;
  this.xPosition = Math.floor(Math.random() * (this.maxX - this.minX + 1) + this.minX);
  this.yPosition = 0;
}

Obstacle.prototype.render = function () {
  this.ctx.beginPath();
  this.ctx.rect(this.xPosition, this.yPosition, this.width, this.height);
  this.ctx.fillStyle = '#870007';
  this.ctx.fill();
  this.ctx.closePath();
};

Obstacle.prototype.update = function () {
  this.yPosition += 1;
}

Obstacle.prototype.isAvoided = function () {
  return this.yPosition > this.canvas.height;
}
