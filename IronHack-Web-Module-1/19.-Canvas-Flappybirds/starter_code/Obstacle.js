
function Obstacle(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.ctx;
  this.minGap = 60;
  this.maxGap = 140;
  this.gap = Math.floor(Math.random() * (this.maxGap - this.minGap + 1) + this.minGap);
  this.width = 70;
  this.minHeight = 50;
  this.maxHeight = 320;
  this.heightTop = Math.floor(Math.random() * (this.maxHeight - this.minHeight + 1) + this.minHeight);
  this.heightBottom = this.canvas.height - this.heightTop - this.gap;
  this.x = this.canvas.width;
  this.yTop = 0;
  this.yBottom = this.heightTop + this.gap;
  this.ObstacleTopImg = new Image();
  this.ObstacleTopImg.src = "./images/obstacle_top.png";
  this.ObstacleBottomImg = new Image();
  this.ObstacleBottomImg.src = "./images/obstacle_bottom.png";
};

Obstacle.prototype.renderObstacle = function () {
  this.ctx.drawImage(this.ObstacleTopImg, 0, 0, 138, 793, this.x, this.yTop, this.width, this.heightTop);
  this.ctx.drawImage(this.ObstacleBottomImg, 0, 0, 138, 793, this.x, this.yBottom, this.width, this.heightBottom);
};

Obstacle.prototype.updateObstacle = function () {
  this.x--;
};

Obstacle.prototype.isAvoided = function () {
  return this.x + this.width <= 0;
};