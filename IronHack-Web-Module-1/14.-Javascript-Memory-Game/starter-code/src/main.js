// All cards
const cards = [
  { name: 'aquaman',         img: 'aquaman.jpg' },
  { name: 'batman',          img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four',  img: 'fantastic-four.jpg' },
  { name: 'flash',           img: 'flash.jpg' },
  { name: 'green arrow',     img: 'green-arrow.jpg' },
  { name: 'green lantern',   img: 'green-lantern.jpg' },
  { name: 'ironman',         img: 'ironman.jpg' },
  { name: 'spiderman',       img: 'spiderman.jpg' },
  { name: 'superman',        img: 'superman.jpg' },
  { name: 'the avengers',    img: 'the-avengers.jpg' },
  { name: 'thor',            img: 'thor.jpg' },
  { name: 'aquaman',         img: 'aquaman.jpg' },
  { name: 'batman',          img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four',  img: 'fantastic-four.jpg' },
  { name: 'flash',           img: 'flash.jpg' },
  { name: 'green arrow',     img: 'green-arrow.jpg' },
  { name: 'green lantern',   img: 'green-lantern.jpg' },
  { name: 'ironman',         img: 'ironman.jpg' },
  { name: 'spiderman',       img: 'spiderman.jpg' },
  { name: 'superman',        img: 'superman.jpg' },
  { name: 'the avengers',    img: 'the-avengers.jpg' },
  { name: 'thor',            img: 'thor.jpg' }
];

// When the document is loaded...
$(document).ready(function() {
  // Create game instance, shuffle cards and render them on the board
  const memoryGame = new MemoryGame(cards);
  memoryGame.shuffleCards();
  let html = '';
  memoryGame.cards.forEach(function (pic) {
    html += '<div class="card" data-card-name="'+ pic.name +'">';
    html += '  <div class="back" name="'+ pic.img +'"></div>';
    html += '  <div class="front" style="background: url(img/'+ pic.img +') no-repeat"></div>';
    html += '</div>';
  });
  $('#memory_board').html(html);

  // When the user clicks a card, the game starts!
  $('.back').click(function () {
    // Restriction: only two cards can be picked.
    if(memoryGame.pickedCards.length <= 1) {
      // Save picked card and show it
      memoryGame.pickedCards.push($(this));
      turnCard($(this));
      // If two cards are already picked...
      if(memoryGame.pickedCards.length === 2) {
        // Check if they are the same and update score
        const firstCard = memoryGame.pickedCards[0].attr("name");
        const secondCard = memoryGame.pickedCards[1].attr("name");
        const isCorrect = memoryGame.checkIfPair(firstCard, secondCard);
        updateScore();
        // If they are the same, check if game over. Else, hide current cards. 
        isCorrect ? memoryGame.isFinished() ? gameOver() : resetPickedCards() : hideCards();
      }
    }
  });

  function updateScore () {
    $('#pairs_clicked').text(memoryGame.pairsClicked);
    $('#pairs_guessed').text(memoryGame.pairsGuessed);
  }

  function createWinMessage () {
    const message = $('<p></p>')
    const pairsClicked = $('<p></p>'); 
    const pairsGuessed = $('<p></p>');
    pairsClicked.text(`Pairs clicked: ${memoryGame.pairsClicked}`);
    pairsGuessed.text(`Pairs guessed: ${memoryGame.pairsGuessed}`);
    message.text('You won!');
    return $('<div id="gameover"></div>').append(message).append(pairsClicked).append(pairsGuessed);
  }

  function gameOver () {
    const messageElement = createWinMessage();
    $('body').prepend(messageElement); 
    const id = setTimeout( () => {
      clearTimeout(id);
      location.reload();
    }, 4000);
  }

  function resetPickedCards () {
    memoryGame.pickedCards = [];
  }

  function hideCards () {
    const id = setTimeout( () => {
      for (let i = 0; i < memoryGame.pickedCards.length; i++) {
        turnCard(memoryGame.pickedCards[i]);
      }
      clearTimeout(id);
      resetPickedCards();
    }, 1000);
  }

  function turnCard (element) {
    element.toggleClass("front");
    element.toggleClass("back");
    element.siblings().toggleClass("back");
    element.siblings().toggleClass("front");
  }

});


