window.onload = function() {
  document.getElementById('start-button').onclick = function() {
    startGame();
  };

  function startGame() {
    // Variables
    const canvas = new Canvas();
    const player = new Player(canvas);
    let obstaclesArray = [];
    let frames = 0;
    let score = 0;
    let isGameOver;
    const scoreNumber = document.getElementById('score');
    
    // Hide gameover screen and show canvas
    const finalScoreElement = document.getElementById('gameover-container');
    const scoreElement = document.getElementById('score-container');
    canvas.canvas.classList.remove('hidden');
    scoreElement.classList.remove('hidden');
    finalScoreElement.classList.add('hidden');

    // Add event listeners to control the car
    function handleKeyDown (e) {
      const pressedKey = e.key;
      if (pressedKey === 'ArrowLeft') {
        player.speed -= 1;
      } else if (pressedKey === 'ArrowRight') {
        player.speed += 1;
      }
    }

    function handleKeyUp () {
      player.speed = 0;
    }
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Helpers
    function createObstacles () {
      if(frames % 120 === 0) {
        const obstacle = new Obstacle(canvas);
        obstaclesArray.push(obstacle);
      }
    }

    function updateScore () {
      if(frames % 15 === 0) { score++; }
    }

    function gameOver () {
      const finalScore = document.getElementById('final-score');
      canvas.canvas.classList.add('hidden');
      scoreElement.classList.add('hidden');
      finalScoreElement.classList.remove('hidden');
      finalScore.innerText = score;
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    }

    // Game Loop
    function loop() {
      frames += 1;

      // Clear
      canvas.resetBoard();

      // Update
      player.update();
      obstaclesArray.forEach(obstacle => obstacle.update());
      obstaclesArray = obstaclesArray.filter(obstacle => !obstacle.isAvoided());
      isGameOver = obstaclesArray.map(obstacle => player.checkCollision(obstacle))
      createObstacles();
      updateScore();
      scoreNumber.innerText = score;

      // Render
      canvas.renderBoard();
      player.render();
      obstaclesArray.forEach(obstacle => obstacle.render());

      // Loop
      isGameOver.includes(true) ? gameOver() : requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }

};
