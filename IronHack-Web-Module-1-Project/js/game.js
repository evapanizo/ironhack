'use strict'

class Game {

  constructor () {
    const self = this;

    // HTML Elements
    self.gameElement = null;
    self.canvasElement = null;
    self.livesElement = null;
    self.scoreElement = null;
    self.timeElement = null;
    self.levelElement = null;
    // End Game Callback Function
    self._onGameOverCallback = null;
    // Canvas
    self.ctx = null;
    self.width = 0;
    self.height = 0;             
    // Game Characters
    self.vehicle = null;
    self.crabs = null;
    self.trex = null;
    self.oneUp = null;
    // Time references
    self.lastCrab = Date.now();
    self.timeMoreCrabs = Date.now();
    self.clockReference = Date.now();
    self.trexAppears = Date.now();
    self.extraLife = Date.now();
    self.timeUntilNextCrab = 800;
    self.timeUntilNextLevel = 10000;
    self.minTimeUntilNextCrab = 350;
    self.timeDecrease = 50;
    self.timeUntilTrex = 15000;
    self.timeUntilExtraLife = 10000;
    // Game statistics & variables
    self.score = 0;
    self.level = 1;
    self.scoreForLife = 200;
    self.maxLevel = ((self.timeUntilNextCrab - self.minTimeUntilNextCrab) / self.timeDecrease) + 1;
    self.ncrabs = 20;
    // Flags
    self.lifeActivation = false;
    // Audio
    self.gameTheme = new Audio("audio/game-theme.mp3");
    self.gameTheme.setAttribute('loop', true);
    self.crabsTheme = new Audio("audio/crab-running.mp3");
    self.crabsTheme.setAttribute('loop', true);
    self.carSound = new Audio("audio/car-horn.mp3");
    // CALLS
    self._start();
    self._startAnimationLoop();
  }

  // Build Game Screen
  _start () {
    const self = this;
    /// Build HTML
    self.gameElement = buildDom(`
    <main class = "main-container-game">
      <div class = "game-container">
        <canvas class = "canvas"></canvas>
      </div>
      <section class = "game-stats">
        <p class = "game-time">Time: <span class = "time"></span></p>
        <p class = "game-level">Level: <span class = "level"></span></p>
        <p class = "game-score">Score: <span class = "score"></span></p>
        <p class = "game-lives">Lives: <span class = "lives"></span></p>
      </section>
    </main>
    `);
    document.body.insertBefore(self.gameElement, document.body.childNodes[0]);

    self.canvasParentElement = document.querySelector(".game-container");
    self.width = self.canvasParentElement.offsetWidth;
    self.height = self.canvasParentElement.offsetHeight;

    /// Canvas dimensions
    self.canvasElement = document.querySelector(".canvas");
    self.canvasElement.setAttribute('width', self.width);
    self.canvasElement.setAttribute('height', self.height);
    /// Canvas context
    self.ctx = self.canvasElement.getContext('2d');
    /// Game statistics elements
    self.livesElement = document.querySelector("span.lives");
    self.scoreElement = document.querySelector("span.score");
    self.timeElement = document.querySelector("span.time");
    self.levelElement = document.querySelector("span.level");
  }

  // Initiate animation loop
  _startAnimationLoop () {
    const self = this;
    /// Instance the vehicle
    self.vehicle = new Vehicle(self.canvasElement);
    /// Instance an empty array of crabs
    self.crabs = [];
    /// Instance new background
    self.background = new Background(self.canvasElement);  
    /// Instance the T-Rex
    self.trex = new Trex(self.canvasElement);
    /// Initiate game statistics
    self.livesElement.innerText = self.vehicle.lives;
    self.scoreElement.innerText = self.score;
    self.levelElement.innerText = `${self.level} / ${self.maxLevel}`;
    /// Play music
    self.gameTheme.currentTime = 0;
    self.gameTheme.volume = 0.9;
    self.gameTheme.play();
    self.crabsTheme.currentTime = 0;
    self.crabsTheme.volume = 0.15;
    self.crabsTheme.play();
    self.vehicle.sound();
    /// Update the vehicle position according to keyboard events
    self.handleKeyDown = event => {
      const pressedKey = event.key;
      if (pressedKey === 'ArrowLeft') {
        self.vehicle.setDirection(-1);
        self.vehicle.updateXPosition();
      } else if (pressedKey === 'ArrowRight') {
        self.vehicle.setDirection(1);
        self.vehicle.updateXPosition();
      } else if (pressedKey === 'ArrowUp') {
        self.vehicle.setDirection(-1);
        self.vehicle.updateYPosition();
      } else if (pressedKey === 'ArrowDown') {
        self.vehicle.setDirection(1);
        self.vehicle.updateYPosition();
      }
    }
    
    document.addEventListener('keydown', self.handleKeyDown);

    /// Function of the animation loop
    self.loop = () => {
      //// Clear canvas
      self._clearAll();
      //// Update game elements
      self._updateAll();
      //// Render game elements
      self._renderAll();
      
      /// End Game condition
      if (self._vehicleIsBroken()) {
        document.removeEventListener('keydown', self.handleKeyDown);
        self.gameTheme.pause();
        self.crabsTheme.pause();
        self._onGameOverCallback();
      } else {
        requestAnimationFrame(self.loop);
      }
    }

    /// Start animation loop
    requestAnimationFrame(self.loop);
  }

  // Clear all elements in the canvas
  _clearAll () {
    const self = this;
    /// Clears the canvas
    self.ctx.clearRect(0, 0, self.width, self.height);
  }

  // Update all elements in the canvas
  _updateAll () {
    const self = this;
    /// Update the background position
    self.background.update();
    /// Update crabs position
    self._updateCrabs();
    /// Remove crabs out of y limits 
    self._updateDeadCrabs();
    /// Check collision of the vehicle with each crab
    self._checkAllCollision();
    /// Update difficulty level
    self._updateLevel();
    /// Update time
    self._updateTime();
    /// Spawn a new enemy
    self._spawnCrab();
    /// Update T-Rex if Easter Egg is activated
    if(self.trex.easterEgg){
      self._trexEasterEgg();
    }
    /// An extra life appears at a given time interval and it is updated if the interval has passed
    self._extraLife();
    if(self.lifeActivation){
      self.oneUp.updatePosition();
      self._catchedLife();
      self._updateMissedLife();
    }
    
  }
  // Render all elements in the canvas
  _renderAll () {
    const self = this;
    /// Render the background
    self.background.render();
    /// Render the vehicle
    self.vehicle.render();
    /// Render the crabs
    self._renderCrabs();
    /// Render T-Rex if Easter Egg is activated and time until T-Rex has passed
    if (self.trex.renderEasterEgg){
      self.trex.render();
    }
    // Render a new extra life if time until extra life has passed
    if(self.lifeActivation){
      self.oneUp.render();
    }
  }

  // Update crabs position
  _updateCrabs () {
    const self = this;
    self.crabs.forEach(crab => {
      crab.updatePosition();
    });
  }

  // Remove crabs out of y limits - Remove crab from game if avoided
  _updateDeadCrabs () {
    const self = this;
    self.crabs = self.crabs.filter(crab => {
      const isAvoided = crab.isAvoided(); 
      if (isAvoided) {
        self.score++;
        self.scoreElement.innerText = self.score;
      }
      return !isAvoided;
    });
  }

  // Check collision of vehicle with all crabs
  _checkAllCollision () {
    const self = this;
    self.crabs.forEach( (crab, index) => {
      if (self.vehicle.checkCollision(crab)) {
        /// Remove health point to vehicle and update statistics
        self.vehicle.collision();
        self.livesElement.innerText = self.vehicle.lives;
        self.vehicle.crabCollisionSound();
        /// Remove crushed crab
        self.crabs.splice(index, 1);
      }
      if(self.trex.renderEasterEgg && self.trex.checkCollision(crab)){
        /// Remove crushed crab
        self.crabs.splice(index, 1);
        self.trex.crabCollisionSound();
      }
    });
  }

  // Update difficulty level at a given interval of time
  _updateLevel () {
    const self = this;
    /// Time interval condition
    const timePassed = Date.now() - self.timeMoreCrabs; 
    if (timePassed > self.timeUntilNextLevel && self.timeUntilNextCrab > self.minTimeUntilNextCrab) {
      //// Update difficulty level
      self.timeUntilNextCrab -= self.timeDecrease;
      self.level += 1;
      self.levelElement.innerText = `${self.level} / ${self.maxLevel}`;
      //// Increase crab size
      if (self.level === 3){
        self.ncrabs = 10;
      }
      //// Restart time reference
      self.timeMoreCrabs = Date.now();
    }
  }

  // Update time
  _updateTime () {
    const self = this;
    /// Time passed since the game started
    const timePassed = Date.now() - self.clockReference;
    /// Conversion of time (ms) to minutes and seconds
    let minutes = Math.floor((timePassed  % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timePassed  % (1000 * 60)) / 1000);
    /// If minutes or seconds are lower than 10, a 0 is added before their value for time display.
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    /// Update of time
    self.timeElement.innerText = `${minutes}:${seconds}`;
  }

  // Spawn a new crab at a given interval of time
  _spawnCrab () {
    const self = this;
    /// Time interval condition
    const timePassed = Date.now() - self.lastCrab;
    if (timePassed > self.timeUntilNextCrab) {
      //// Instance a new crab
      const newCrab = new Crab(self.canvasElement, self.ncrabs)
      //// Find a start x position: [0, crab.width, 2 * crab.width, ..., ncrabs * crab.width]
      const randomXPosition = Math.floor(Math.random() * (self.width / newCrab.width)) * newCrab.width;
      newCrab.xposition = randomXPosition;
      //// Push crab to crabs array
      self.crabs.push(newCrab);
      //// Restart time reference
      self.lastCrab = Date.now();
    }
  }

  // T-Rex Appears!!
  _trexEasterEgg () {
    const self = this;
    /// Time interval condition
    const timePassed = Date.now() - self.trexAppears;
    if (timePassed > self.timeUntilTrex) {
      self.trex.sound();
      self.trex.renderEasterEgg = true;
      self.trex.updatePosition();
    }
  }

  // Check if an extra life appears. If so, create extra life. 
  _extraLife () {
    const self = this;
    /// Time interval condition
    const timePassed = Date.now() - self.extraLife;
    if (timePassed > self.timeUntilExtraLife) {
      self.oneUp = new Life(self.canvasElement);
      self.lifeActivation = true;
      self.extraLife = Date.now();
    }
  }

  // Check if extra life is catched - Update life, speed and score accordingly
  _catchedLife () {
    const self = this;
    const isCatched = self.vehicle.checkCollision(self.oneUp);
    if (isCatched) {
      self.oneUp = null;
      self.lifeActivation = false;
      self.vehicle.lifeCollisionSound ();
      if(self.vehicle.lives < 4 && self.vehicle.lives > 0){
        self.vehicle.oneUp();
      }
      self.score += self.scoreForLife;
      self.scoreElement.innerText = self.score;
      self.livesElement.innerText = self.vehicle.lives;
    }
  }

  // Remove extra life out of y limits - Remove life from game if avoided
  _updateMissedLife () {
    const self = this;
    if(self.oneUp != null){
      const isAvoided = self.oneUp.isAvoided(); 
      if (isAvoided) {
        self.oneUp = null;
        self.lifeActivation = false;
      }
    }
  }

  // Render all crabs
  _renderCrabs () {
    const self = this;
    self.crabs.forEach(crab => {
      crab.render();
    });
  }

  // Check if the vehicle is broken
  _vehicleIsBroken () {
    const self = this;
    return self.vehicle.lives <= 0;
  }

  // Store the callback function needed to end the game
  onOver (callback) {
    const self = this;
    self._onGameOverCallback = callback;
  }

  // Destroy the game
  destroy () {
    const self = this;
    self.gameElement.remove();
  }
}