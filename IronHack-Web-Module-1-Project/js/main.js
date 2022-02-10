'use strict'

const buildDom = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

const main = () => {

  // Screen Containers
  let splashElement;
  let gameOverElement;

  // Splash Elements
  let startButton;
  let crabImage;
  let comicImage;
  let jumpCrabImage;
  let jumpCrabSound;

  // Game Over elements
  let restartButton;
  let mainMenuButton;

  // Splash event listener functions
  const handleSplashClick = () => {
    destroySplash();
    buildGame();
  }

  const handleSoundClick = () => {
    cuteCrabSound.play();
  }

  const handleCrabClick = () => {
    const keyBindingElement = splashElement.querySelector("div.instructions");
    keyBindingElement.classList.toggle("hidden");
  }

  // Audio files
  const gameOverTheme = new Audio("audio/gameover-theme.mp3");
  gameOverTheme.setAttribute('loop', true);
  const cuteCrabSound = new Audio("audio/crab-cute.mp3");

  // SPLASH SCREEN

  /// Build Splash Screen
  const buildSplash = () => {
    //// Build HTML
    splashElement = buildDom(`
    <main class = "main-container">
      <h1 class = "game-title">Flat Tires</h1>
      <iframe src = "audio/crab-cute.mp3" style = "display: none"></iframe>
      <audio src = "audio/jump-sound.mp3" loop = "true" autoplay = "true"></audio>
      <a class = "start-btn btn" onselectstart="return false">Start Game</a>
      <img src = "images/crab.png" class = "crab-img">
      <img src = "images/shadow.png" class = "shadow-crab-img">
      <img src = "images/comic.png" class = "comic-img">
      <img src = "images/crab.png" class = "jump-crab-img">
      <img src = "images/shadow.png" class = "shadow-jump-crab-img">
      <div class = "instructions hidden">
        <p class = "instructions-text">Don't let the crabs prick your wheels! Avoid them! You can fix your flat tires by catching air pumps.</p>
        <img src = "images/keybinds.png" class = "keybinds">
        <p class = "instructions-text"> Use the arrow keys to move your vehicle in every direction.</p>
      </div>
    </main>
    `);
    document.body.insertBefore(splashElement, document.body.childNodes[0]);
    //// Add event listener to Start Game button
    startButton = splashElement.querySelector("a.start-btn");
    startButton.addEventListener("click", handleSplashClick);     /* WARNING WARNING WARNING WARNING WARNING */
    
    //// Add event listener to show key bindings, play sounds, ...
    crabImage = splashElement.querySelector("img.crab-img");
    comicImage = splashElement.querySelector("img.comic-img");
    jumpCrabImage = splashElement.querySelector("img.jump-crab-img");
    jumpCrabSound = splashElement.querySelector("audio");
    crabImage.addEventListener("mouseenter", handleCrabClick);
    crabImage.addEventListener("mouseleave", handleCrabClick);
    crabImage.addEventListener("mouseenter", handleSoundClick);
    comicImage.addEventListener("mouseenter", handleCrabClick);
    comicImage.addEventListener("mouseleave", handleCrabClick);
    comicImage.addEventListener("mouseenter", handleSoundClick);
    jumpCrabImage.addEventListener("mouseenter", handleSoundClick);
    jumpCrabSound.volume = 0.1;
  }

  /// Destroy Splash Screen
  const destroySplash = () => {
    jumpCrabSound.pause();
    jumpCrabSound.currentTime = 0;
    startButton.removeEventListener("click", handleSplashClick); 
    crabImage.removeEventListener("mouseenter", handleCrabClick);
    crabImage.removeEventListener("mouseleave", handleCrabClick);
    crabImage.removeEventListener("mouseenter", handleSoundClick);
    comicImage.removeEventListener("mouseenter", handleCrabClick);
    comicImage.removeEventListener("mouseleave", handleCrabClick);
    comicImage.removeEventListener("mouseenter", handleSoundClick);
    jumpCrabImage.removeEventListener("mouseenter", handleSoundClick);
    splashElement.remove();
  }

  // GAME SCREEN
  
  let flatTires = null;

  /// Build Game Screen
  const buildGame = () => {
    flatTires = new Game();
    //// Game recieves transition to Game Over Screen
    flatTires.onOver(handleGameOver);
  }

  /// Transition from Game Screen to Game Over Screen 
  const handleGameOver = () => {
    destroyGame();
    buildGameOver();
  }

  /// Destroy Game Screen
  const destroyGame = () => {
    flatTires.destroy();
  }

  // GAME OVER SCREEN

  // Game over event listener functions
  const handleGameOverRestartClick = () => {
    destroyGameOver();
    buildGame();
  }

  const handleGameOverMenuClick = () => {
    destroyGameOver();
    buildSplash();
  }

  /// Build Game Over screen
  const buildGameOver = () => {
    //// Build HTML
    gameOverElement = buildDom(`
    <main class = main-container>
      <img src = "images/sad-crab.png" class = "crab-img-game-over">
      <img src = "images/shadow.png" class = "shadow-crab-img-game-over">
      <h1 class = "game-over-title">Game Over</h1>
      <p class = "game-final-score"></p>
      <p class = "game-final-level"></p>
      <div class = btn-container>
          <a class = "main-menu-btn btn" onselectstart="return false">Main Menu</a>
          <a class = "restart-btn btn" onselectstart="return false">Play again</a>
      </div>
    </main>
    `);
    document.body.insertBefore(gameOverElement, document.body.childNodes[0]);
    //// Display final score
    const scoreElement = gameOverElement.querySelector("p.game-final-score");
    scoreElement.innerText = `Score: ${flatTires.score}`;
    //// Display level achieved
    const levelElement = gameOverElement.querySelector("p.game-final-level");
    let levelMessage;
    if (flatTires.level <= 5){
      levelMessage = "Keep trying...You only reached level "
    } else if (flatTires.level > 5){
      levelMessage = "Congratulations! You reached level "
    }
    levelElement.innerText = `${levelMessage} ${flatTires.level} out of ${flatTires.maxLevel }.`;
    /// Audio
    gameOverTheme.currentTime = 0;
    gameOverTheme.play()
    //// Add button to return to Game Screen
    restartButton = gameOverElement.querySelector("a.restart-btn");
    restartButton.addEventListener("click", handleGameOverRestartClick);

    //// Add button to return to Splash Screen
    mainMenuButton = gameOverElement.querySelector("a.main-menu-btn");
    mainMenuButton.addEventListener("click", handleGameOverMenuClick);
  }

  /// Destroy Game Over screen
  const destroyGameOver = () => {
    gameOverTheme.pause();
    restartButton.removeEventListener("click", handleGameOverRestartClick);
    mainMenuButton.removeEventListener("click", handleGameOverMenuClick);
    gameOverElement.remove();
  }

  // CALLS
  buildSplash();

}

document.addEventListener('DOMContentLoaded', main);