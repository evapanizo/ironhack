function Player(canvas) {
  this.width = 40;
  this.height = 60;
  this.canvas = canvas;
  this.ctx = this.canvas.ctx;
  this.carImg = new Image();
  this.carImg.src = "./images/car.png";
  this.xPosition = this.canvas.width * 0.5 - 20;
  this.yPosition = this.canvas.height - 70;
  this.direction = 0;
  this.speed = 0;
  this.greenArea = 40;
}

Player.prototype.render = function () {
  this.ctx.drawImage(this.carImg, 0, 0, 158, 319, this.xPosition, this.yPosition , this.width, this.height);
};

Player.prototype.update = function () {
  const newXPosition = this.xPosition + this.speed;
  if(newXPosition >= this.greenArea && newXPosition <= this.canvas.width - this.width - this.greenArea) {
    this.xPosition = newXPosition;
  }
}

Player.prototype.checkCollision = function (object) {
  const collideTop = this.yPosition < object.yPosition + object.height;
  const collideRight = this.xPosition < object.xPosition + object.width;
  const collideLeft = this.xPosition + this.width > object.xPosition;
  const collideBottom = this.yPosition + this.height > object.yPosition;
  return collideTop && collideLeft && collideRight && collideBottom;
}
