
function Player(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.ctx;
  this.width = 50;
  this.height = 40;
  this.x = 200;
  this.y = 250;
  this.speedY = 0;
  this.gravity = 0;
  this.pull = 0;
  this.playerImg = new Image();
  this.playerImg.src = "./images/flappy.png";
};

Player.prototype.startMoving = function () {
    this.isMoving = true;
    this.gravity = 0.1;
};

Player.prototype.updatePlayer = function () {
  this.speedY += (this.gravity - this.pull);
  this.y += this.speedY;
};

Player.prototype.renderPlayer = function () {
  this.ctx.drawImage(this.playerImg, 0, 0, 498, 351, this.x, this.y, this.width, this.height);
};

Player.prototype._checkOutOfCanvas = function () {
  const collideTop = this.y < 0;
  const collideBottom = this.y + this.height > this.canvas.height;
  return collideTop || collideBottom;
}

Player.prototype._checkCollision = function (objectArray) {
  return objectArray.map(object => {
    const collideTop = this.y < object.yTop + object.heightTop;
    const collideRight = this.x + this.width > object.x;
    const collideLeft = this.x < object.x + object.width;
    const collideBottom = this.y + this.height > object.yBottom;
    return collideLeft && collideRight && (collideTop || collideBottom);
  })
}

Player.prototype.checkGameOver = function (objectArray) {
  const isOutOfCanvas = this._checkOutOfCanvas();
  const hasCollided = this._checkCollision(objectArray).includes(true);
  return isOutOfCanvas || hasCollided;
}