var hangman;

function Hangman() {
  this.words = ['espatula', 'enigma', 'bucle'];
  this.secretWord = '';
  this.letters = [];
  this.guessedLetter = '';
  this.errorsLeft = 8;
  this.isGameFinished;
}

Hangman.prototype.getWord = function () {
  const index = Math.floor(Math.random() * this.words.length);
  this.secretWord = this.words[index].toLowerCase();
  return this.secretWord;
};

Hangman.prototype.checkIfLetter = function (keyCode) {
  return keyCode >= 65 && keyCode <= 90 || keyCode >= 97 && keyCode <= 122;
};

Hangman.prototype.checkClickedLetters = function (key) {
  return this.letters.includes(key);
};

Hangman.prototype.checkCorrectLetter = function (letter) {
  const isCorrect = this.secretWord.includes(letter.toLowerCase());
  if(isCorrect) {
    const indices = [];
    for(let index = 0; index < this.secretWord.length; index++) {
      if(this.secretWord[index] === letter) { indices.push(index); }
    }
    return indices;
  }
  return false;
};

Hangman.prototype.addCorrectLetter = function (i) {
  this.guessedLetter += this.secretWord[i].toUpperCase();
};

Hangman.prototype.addWrongLetter = function (letter) {
  this.letters.push(letter);
  this.errorsLeft  --;
};

Hangman.prototype.checkGameOver = function () {
  return this.errorsLeft === 0;
};

Hangman.prototype.checkWinner = function () {
  return this.secretWord.length === this.guessedLetter.length;
};

document.getElementById('start-game-button').onclick = function () {
  hangman = new Hangman();
  hangman.isGameFinished = false;
  const secretWord = hangman.getWord();
  canvas = new HangmanCanvas(secretWord);
  canvas.createBoard();
};

document.onkeydown = function (e) {
  if (hangman !== undefined && !hangman.isGameFinished) {
    const code = e.keyCode;
    const isLetter = hangman.checkIfLetter(code);
    if(isLetter) {
      const letter = e.key;
      const isClicked = hangman.checkClickedLetters(letter);
      const indices = hangman.checkCorrectLetter(letter);
      if(indices && !isClicked) {
        hangman.letters.push(letter);
        indices.forEach(index => {
          hangman.addCorrectLetter(index);
          canvas.writeCorrectLetter(index);
        });
        if(hangman.checkWinner()) {
          canvas.winner();
          hangman.isGameFinished = true;
        }
      } else if (!indices && !isClicked){
        canvas.writeWrongLetter(letter, hangman.errorsLeft);
        canvas.drawHangman(hangman.errorsLeft);
        hangman.addWrongLetter(letter);
        if(hangman.checkGameOver()) {
          canvas.gameOver();
          hangman.isGameFinished = true;
        }
      }
    }
  }
};
