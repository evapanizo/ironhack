
function Canvas() {
  this.canvas = document.getElementById('canvas-board');
  this.ctx = this.canvas.getContext('2d');
  this.width = this.canvas.width;
  this.height = this.canvas.height;
  this.firstBackgroundImg = new Image();
  this.firstBackgroundImg.src = "./images/bg.png";
  this.firstX = 0;
  this.secondBackgroundImg = new Image();
  this.secondBackgroundImg.src = "./images/bg.png";
  this.secondX = this.width;
  this.speed = 2;
};

Canvas.prototype.resetCanvas = function () {
  this.ctx.clearRect(0, 0, this.width, this.height);
};

Canvas.prototype.renderBackground = function () {
  this.ctx.drawImage(this.firstBackgroundImg, 0, 0, 900, 500, this.firstX, 0, this.width, this.height);
  this.ctx.drawImage(this.secondBackgroundImg, 0, 0, 900, 500, this.secondX, 0, this.width, this.height)
};

Canvas.prototype.updateBackground = function () {
  this.firstX -= this.speed;
  this.secondX -= this.speed;
  if(this._outOfXLimits(this.firstX)) { this.firstX = this.width; }
  else if (this._outOfXLimits(this.secondX)) {this.secondX = this.width; }
};

Canvas.prototype._outOfXLimits = function (xPosition) {
  return xPosition <= 0 - this.width
}

Canvas.prototype.gameOver = function (frames) {
  const message = 'Game Over';
  const score = 'Score: ' + frames
  this.ctx.font = '48px serif';
  this.ctx.fillText(message, 340, 150)
  this.ctx.fillText(score, 340, 250)
}