
function Canvas() {
  this.canvas = document.getElementById('game-board');
  this.ctx = this.canvas.getContext('2d');
  this.width = this.canvas.width;
  this.height = this.canvas.height;
};

Canvas.prototype.resetBoard = function () {
  this.ctx.clearRect(0, 0, this.width, this.height);
};

Canvas.prototype.renderBoard = function () {
  this._renderVegetation();
  this._renderRoad();
  this._renderLines();
};

Canvas.prototype._renderVegetation = function () {
  this.ctx.beginPath();
  this.ctx.rect(0, 0, 20, this.height);
  this.ctx.rect(this.width - 20, 0, 20, this.height);
  this.ctx.fillStyle = "green";
  this.ctx.fill();
  this.ctx.closePath();
};

Canvas.prototype._renderRoad = function () {
  this.ctx.beginPath();
  this.ctx.rect(20, 0, 10, this.height);
  this.ctx.rect(this.width - 30, 0, 10, this.height);
  this.ctx.rect(40, 0, this.width - 80, this.height);
  this.ctx.fillStyle = "grey";
  this.ctx.fill();
  this.ctx.closePath();
};

Canvas.prototype._renderLines = function () {
  this.ctx.beginPath();
  this.ctx.setLineDash([20, 15]);
  this.ctx.moveTo(this.width * 0.5, 0);
  this.ctx.lineTo(this.width * 0.5, this.height);
  this.ctx.strokeStyle = "white";
  this.ctx.lineWidth = 6;
  this.ctx.stroke();
  this.ctx.closePath();
};