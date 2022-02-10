# FLAT TIRES

## Description
Cuban roads are full of obstacles and one of them is CRABS!
The goal of this game is driving a car that must avoid running into crabs invading the road. 
The car moves horizontally and vertically from side to side of the canvas. 
The crabs move horizontally from side to side of the canvas and towards the car.
The car has 4 lives, one for each tire. Once all tires are flat, it is GAME OVER. 
For each avoided crab, score increases one point. 
You can increase your lives and score counters by catching air pumps. 
Each air pump increases one life and two hundred points.
If the car runs into a crab, the car's speed decreases.
If the car catches an air pump, the car's speed increases.
As game time increases, difficulty increases: more crabs appear and they get bigger. 
There is an easter egg that helps you remove crabs from the road. 

## MVP (DOM - CANVAS)
- Car is rendered and moves horiontally in the bottom part of the canvas. 
- Crabs are rendered move forward approaching the car. 
- Score increases as a crab is avoided.
- Game ends when 4 lives are lost. 

## Backlog
- Crabs move horizontally from side to side of the canvas.
- The car speed decreases when it runs into a crab. 
- The car moves in all directions.
- Add air pumps to the game.
- Add mysterious easter egg. 
- Add style to car and crabs.
- Add style to splash and game over screens. 
- Add style and movement to the background of the game.
- Add audio to the game and game elements. 
- Add animations to crabs. 
- Add a timer, increse difficulty by adding more crabs. 
- Add smooth movements to the car.

## Data structure
### Game.js
#### Properties
    HTML Elements
    End Game Callback Function
    Canvas Properties
    Game Characters
    Time references
    Game statistics & variables
    Flags
    Audio files
#### Methods
    start                       // Initializes the game layout
    startLoop                   // Initializes the game animations
        clearAll                // Deletes canvas drawing
        updateAll               // Updates element values (player, enemies, stats, ...)
            spawnEnemies        // Creates many enemies
            updateEnemies       // Updates the properties of each enemies 
            checkAllCollisions  // Checks collisions between all enemies and the player
            checkGameOver       // Checks if the game has ended
            updateGameStats     // Updates score, lives, ...
            checkGameTime       // Checks if the difficulty has to be increased
        renderAll               // Renders elements after the update
    destroy                     // Destroys de game
    onOver                      // Recieves the method to call when the game is over
    
### Crabs.js
#### Properties
    canvas context
    position x
    position y
    direction x
    direction y
    speed
    size
#### Methods
    updatePosition      // Updates the position of the crab
    render              // Renders the crab
    checkLimits         // Checks if the crab has collided with the canvas x limits and changes its direction if so
    isDead              // Checks if the crab has already reached the bottom of the canvas

### Vehicle.js
#### Properties
    canvas context
    lives
    position x
    position y
    speed
    direction x
    size
#### Methods
    updatePosition        // Updates the position of the vehicle
    render                // Renders the vehicle
    setDirection          // Sets the x direction to which the player wants to move the vehicle
    checkLimits           // Checks if the vehicle has collided with the canvas x limits.
    checkCollision        // Checks if the vehicle has collided with a crab. Decreases speed and lives.
    
### Backlog Data Structures

#### Life.js
##### Properties
    canvas context
    position x
    position y
    speed
    firstImage
    secondImage
##### Methods
    update                // Updates the position of a life.
    render                // Renders the life.
    isAvoided             // Checks if the life is out of canvas limits.. 

#### Background.js
##### Properties
    canvas context
    position x
    position y
    speed
    firstImage
    secondImage
##### Methods
    update                // Updates the position of the images.
    render                // Renders the images.
    checkLimits           // Checks if the images are out of canvas limits. 
#### EasterEgg.js
    Surprise!
    
        
## States y States Transitions
### splashScreen
        buildSplash         // Builds splash screen. 
        destroySplash       // Destroys splash screen.
        handleSplashClick   // Transition from splashScreen to gameScreen

### gameScreen
        buildGame       // Builds game screen
        destroyGame     // Destroys game screen
        handleGameOver  // Transition from gameScreen to gameoverScreen 

### gameoverScreen
        buildGameOver               // Builds game over screen
        destroyGameOver             // Destroys game over screen
        handleGameOverClick         // Transition from gameoverScreen to gameScreen


## Task

### MVP

Main.js & Game.js
- Build splash screen - Create transition with game screen (title + start button). 
- Build game screen - Create transition with gameover screen (header with stats + canvas).
- Build game over screen - Create transition with game screen (game over).

Game.js & Vehicle.js
- Create a static player. 
- Create animation (startLoop) of the player's movement.

Game.js & Crabs.js
- Create a static crab.
- Create animation (startLoop) of the crabs's vertical movement.
- Create many crabs. 
- Delete avoided crabs.

Game.js & Vehicle.js
- Check collision between the player and the crabs. Delete crab if collision.  
- Update score and lives.
- Update game over screen with score. 

### Backlog
Game.js & Crabs.js
- Create animation (startLoop) of the crabs's horizontal movement.

Vehicle.js
- Decrease speed when the vehicle runs into a crab. 
- The car moves in all directions.
- Add smooth movements to the car.

Game.js 
- Add style to car and crabs.
- Add style to splash and game over screens. 
- Add style to the background of the game.
- Add audio to the game and game elements. 
- Add animations to crabs. 
- Add a timer, increse difficulty by adding more crabs. 

EasterEgg.js
- Add mysterious Easter Egg. 

Life.js
- Air pumps fall vertically in the canvas. 
- Air pumps increase lives and score. 

Background.js
- Add background movement. 


## Links

### Trello
- [Trello](https://trello.com/b/TIdvW5Pt/flat-tires)


### Git
- [Game repository](https://github.com/evapanizo/flat-tires-game)
- [Deployed game](https://evapanizo.github.io/flat-tires-game-ES6/)


### Slides
- [Slides](https://slides.com/evapanizo/flat-tires)
