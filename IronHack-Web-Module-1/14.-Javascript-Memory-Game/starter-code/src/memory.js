const MemoryGame = function (cards) {
  this.cards = cards;
  this.pickedCards = [];
  this.pairsClicked = 0;
  this.pairsGuessed = 0;
};

MemoryGame.prototype.shuffleCards = function () {
  // Fisher and Yates modern algorithm
  for (let i = this.cards.length - 1; i >= 1; i--) {
    const j = Math.floor( Math.random() * i);
    const saveCard = this.cards[i];
    this.cards[i] = this.cards[j];
    this.cards[j] = saveCard;
  }
};

MemoryGame.prototype.checkIfPair = function (firstCard, secondCard) {
  const areEqual = firstCard === secondCard;
  this.pairsClicked += 1;
  if(areEqual) { this.pairsGuessed += 1 };
  return areEqual;
}

MemoryGame.prototype.isFinished = function () {
  return this.pairsGuessed === this.cards.length / 2;
};