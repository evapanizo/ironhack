
function HangmanCanvas(secretWord) {
  this.secretWord = secretWord;
  this.canvas = document.getElementById('hangman');
  this.ctx = this.canvas.getContext('2d');
}

HangmanCanvas.prototype.createBoard = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.drawLines();
};

HangmanCanvas.prototype.drawLines = function () {
  const nLines = this.secretWord.length;
  let x = 250;
  const y = 500;
  const step = 80;
  const lineLength = 70;
  this.ctx.beginPath();
  for(let i = 0; i < nLines; i++) {
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + lineLength, y);
    x = x + step;
  }
  this.ctx.stroke();
  this.ctx.closePath();
};

HangmanCanvas.prototype.writeCorrectLetter = function (index) {
  const x = 250 + 20 + (index * 80);
  const y = 490;
  this.ctx.font = '48px serif';
  this.ctx.fillText(this.secretWord[index].toUpperCase(), x, y)
};

HangmanCanvas.prototype.writeWrongLetter = function (letter, errorsLeft) {
  const x = 1100 - 80 * errorsLeft;
  const y = 100;
  this.ctx.font = '48px serif';
  this.ctx.fillText(letter.toUpperCase(), x, y, 80)
};

HangmanCanvas.prototype.drawHangman = function (shape) {
  const x = 0;
  const y = 500;
  this.ctx.beginPath();
  switch(shape) {
    case 8:
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x + 200, y);
      this.ctx.lineTo(x + 100, y - 50);
      this.ctx.lineTo(x, y);
      break;
    case 7:
      this.ctx.lineTo(x + 100, y - 50);
      this.ctx.lineTo(x + 100, y - 475);
      break;
    case 6:
      this.ctx.moveTo(x + 100, y - 475);
      this.ctx.lineTo(x + 350, y - 475);
      break;
    case 5:
      this.ctx.moveTo(x + 350, y - 475);
      this.ctx.lineTo(x + 350, y - 400);
      break;
    case 4:
      const radius = 40;
      const startAngle = 0;
      const endAngle = Math.PI*2;
      this.ctx.arc(x + 350, y - 360, radius, startAngle, endAngle);
      break;
    case 3:
      this.ctx.moveTo(x + 350, y - 320);
      this.ctx.lineTo(x + 350, y - 200);
      break;
    case 2:
      this.ctx.moveTo(x + 350, y - 200);
      this.ctx.lineTo(x + 400, y - 100);
      break;
    default:
      this.ctx.moveTo(x + 350, y - 200);
      this.ctx.lineTo(x + 300, y - 100);
      break;
  }
  this.ctx.stroke();
  this.ctx.closePath();
};

HangmanCanvas.prototype.gameOver = function () {
  const img = new Image();
  const self = this;
  imgScale = 570/240;
  img.src = './images/gameover.png';
  img.onload = function() {
    self.ctx.drawImage(img, 450, 125, 300 * imgScale, 300)
  };
};

HangmanCanvas.prototype.winner = function () {
  const img = new Image();
  const self = this;
  imgScale = 872/618;
  img.src = './images/awesome.png';
  img.onload = function() {
    self.ctx.drawImage(img, 450, 125, 300 * imgScale, 300)
  };
};
