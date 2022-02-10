window.onload = function() {
  let gameOn = false;

  document.getElementById("start-button").onclick = function() {
    if(!gameOn) {
      gameOn = true;
      startGame();
    }
  };

  function startGame() {
    canvas = new Canvas();
    player = new Player(canvas);
    let obstaclesArray = [];
    let frames = 0;
    let isGameOver = false;
    canvas.canvas.classList.remove("hidden")

    // Helpers
    function createObstacles () {
      if(player.isMoving && frames % 300 === 0) {
        obstaclesArray.push(new Obstacle(canvas));
      }
    }
    
    function gameOver () {
      canvas.resetCanvas();
      canvas.gameOver(frames);
      gameOn = false;
    }

    // Loop
    function loop () {
      frames++;
      
      // Clear
      canvas.resetCanvas()

      // Update
      canvas.updateBackground();
      player.updatePlayer();
      obstaclesArray.forEach( obstacle => obstacle.updateObstacle());
      obstaclesArray = obstaclesArray.filter(obstacle => !obstacle.isAvoided());
      isGameOver = player.checkGameOver(obstaclesArray);
      createObstacles();

      // Render
      canvas.renderBackground();
      player.renderPlayer();
      obstaclesArray.forEach(obstacle => obstacle.renderObstacle());

      // Loop
      isGameOver ? gameOver() : requestAnimationFrame(loop);
    }
  
    requestAnimationFrame(loop);
  }
  
  function handleKeyDown (e) {
    if(e.keyCode == 32){
      if(!player.isMoving) { 
        player.startMoving();
        frames = 0;
      };
      player.pull = 0.5;
    }           
  }
  
  function handleKeyUp (e) {
    if (e.keyCode == 32) {
      player.pull = 0;
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);

};
