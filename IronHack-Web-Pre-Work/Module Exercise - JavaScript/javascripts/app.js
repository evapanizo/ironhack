// Rover objects
var rover1 = {
  name: "Rover 1",
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [[0,0]]
}

var rover2 = {
  name: "Rover 2",
  direction: "N",
  x: 9,
  y: 9,
  travelLog: [[9,9]]
}

var rover3 = {
  name: "Rover 3",
  direction: "N",
  x: 9,
  y: 0,
  travelLog: [[9,0]]
}

var rover4 = {
  name: "Rover 4",
  direction: "N",
  x: 0,
  y: 9,
  travelLog: [[0,9]]
}

// Array of rover objects
var rovers = [rover1, rover2, rover3, rover4];

// 2D-Array: Board variable
var board = [ 
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ']];

// Board elements
// Place rovers in the board
for(var i=0;i<rovers.length;i++){
  board[rovers[i].y][rovers[i].x]=rovers[i].direction;
}
// Place obstacles in the board
var obstacles = [[0,1],[5,4],[3,4]];
for(var i=0;i<obstacles.length;i++){
  board[obstacles[i][1]][obstacles[i][0]] = 'O';
} 

// Print board in the console
console.log("Initial position of the rovers and obstacles in Mars:");
console.log(board.join('\n') + '\n\n');

//Turn left function
function turnLeft(rover, board){
  console.log("turnLeft was called!");
  switch(rover.direction){
    case "N":
      rover.direction = "W";
      board[rover.y][rover.x]="W";
      console.log("The rover is facing West.");
      break;
    case "W":
      rover.direction = "S";
      board[rover.y][rover.x]="S";
      console.log("The rover is facing South.");
      break;
    case "S":
      rover.direction = "E";
      board[rover.y][rover.x]="E";
      console.log("The rover is facing East.");
      break;
    case "E":
      rover.direction = "N";
      board[rover.y][rover.x]="N";
      console.log("The rover is facing North.");
      break;
    default:
      console.log("Direction error!");
      break;
  }
}

//Turn right function
function turnRight(rover, board){
  console.log("turnRight was called!");
  switch(rover.direction){
    case "N":
      rover.direction = "E";
      board[rover.y][rover.x]="E";
      console.log("The rover is facing East.");
      break;
    case "E":
      rover.direction = "S";
      board[rover.y][rover.x]="S";
      console.log("The rover is facing South.");
      break;
    case "S":
      rover.direction = "W";
      board[rover.y][rover.x]="W";
      console.log("The rover is facing West.");
      break;
    case "W":
      rover.direction = "N";
      board[rover.y][rover.x]="N";
      console.log("The rover is facing North.");
      break;
    default:
      console.log("Direction error!");
      break;
  }
}

//Move forward function
function moveForward(rover, obstacles, rovers, board){
  console.log("moveForward was called!");
  var collision;
  switch(rover.direction){
    case "N":
      collision = checkCollision(rover.x, rover.y-1, obstacles, rovers);
      if(rover.y!=0 && !collision){
        board[rover.y][rover.x]=' ';
        rover.y -= 1;
        rover.travelLog.push([rover.x,rover.y]);
        board[rover.y][rover.x]='N';
      }else if(collision){console.log("The rover is going to collide!");
      }else{console.log("The rover can't move forward!");}
      break;
    case "E":
      collision = checkCollision(rover.x+1, rover.y, obstacles, rovers);
      if(rover.x!=9 && !collision){
        board[rover.y][rover.x]=' ';
        rover.x += 1;
        rover.travelLog.push([rover.x,rover.y]);
        board[rover.y][rover.x]='E';
      }else if(collision){console.log("The rover is going to collide!");
      }else{console.log("The rover can't move forward!");}
      break;
    case "S":
      collision = checkCollision(rover.x, rover.y+1, obstacles, rovers);
      if(rover.y!=9 && !collision){
        board[rover.y][rover.x]=' ';
        rover.y += 1;
        rover.travelLog.push([rover.x,rover.y]);
        board[rover.y][rover.x]='S';
      }else if(collision){console.log("The rover is going to collide!");
      }else{console.log("The rover can't move forward!");}
      break;
    case "W":
      collision = checkCollision(rover.x-1, rover.y, obstacles, rovers);
      if(rover.x!=0 && !collision){
        board[rover.y][rover.x]=' ';
        rover.x -= 1;
        rover.travelLog.push([rover.x,rover.y]);
        board[rover.y][rover.x]='W';
      }else if(collision){console.log("The rover is going to collide!");
      }else{console.log("The rover can't move forward!");}
      break;
    default:
      console.log("Movement error!");
      break; 
  }
  console.log("The rover is in space " + rover.x + ", " + rover.y +" facing " + rover.direction + ".");
}

function moveBackward(rover, obstacles, rovers, board){
  console.log("moveBackward was called!");
  var collision;
    switch(rover.direction){
    case "N":
      collision = checkCollision(rover.x, rover.y+1, obstacles, rovers);
      if(rover.y!=9 && !collision){
        board[rover.y][rover.x]=' ';
        rover.y += 1;
        rover.travelLog.push([rover.x,rover.y]);
        board[rover.y][rover.x]='N';
      }else if(collision){console.log("The rover is going to collide!");
      }else{console.log("The rover can't move backward!");}
      break;
    case "E":
      collision = checkCollision(rover.x-1, rover.y, obstacles, rovers);
      if(rover.x!=0 && !collision){
        board[rover.y][rover.x]=' ';
        rover.x -= 1;
        rover.travelLog.push([rover.x,rover.y]);
        board[rover.y][rover.x]='E'
      }else if(collision){console.log("The rover is going to collide!");
      }else{console.log("The rover can't move backward!");}
      break;
    case "S":
      collision = checkCollision(rover.x, rover.y-1, obstacles, rovers);
      if(rover.y!=0 && !collision){
        board[rover.y][rover.x]=' ';
        rover.y -= 1;
        rover.travelLog.push([rover.x,rover.y]);
        board[rover.y][rover.x]='S';
      }else if(collision){console.log("The rover is going to collide!");
      }else{console.log("The rover can't move backward!");}
      break;
    case "W":
      collision = checkCollision(rover.x+1, rover.y, obstacles, rovers);
      if(rover.x!=9 && !collision){
        board[rover.y][rover.x]=' ';
        rover.x += 1;
        rover.travelLog.push([rover.x,rover.y]);
        board[rover.y][rover.x]='W';
      }else if(collision){console.log("The rover is going to collide!");
      }else{console.log("The rover can't move backward!");}
      break;
    default:
      console.log("Movement error!");
      break; 
  }
  console.log("The rover is in space " + rover.x + ", " + rover.y +" facing " + rover.direction + ".");
}

function checkCollision(futureX, futureY, obstacles, rovers){
  var collision = false;
  for(var n=0;n<obstacles.length;n++){
    if (obstacles[n][0] === futureX && obstacles[n][1] === futureY){collision = true;}
  }
  for(var n=0;n<rovers.length;n++){
    if (rovers[n].x === futureX && rovers[n].y === futureY){collision = true;}
  }
  return collision;
}

function commands(listOfCommands, rovers, obstacles, board){
    for(var i=0; i<listOfCommands.length;i++){
      rover = rovers[i%rovers.length];
      console.log(rover.name + " is moving!")
      switch(listOfCommands[i]){
        case "l":
          turnLeft(rover, board);
          console.log(board.join('\n') + '\n\n');
          break;
        case "r":
          turnRight(rover, board);
          console.log(board.join('\n') + '\n\n');
          break;
        case "f":
          moveForward(rover, obstacles, rovers, board);
          console.log(board.join('\n') + '\n\n');
          break;
        case "b":
          moveBackward(rover, obstacles, rovers, board);
          console.log(board.join('\n') + '\n\n');
          break;
        default:
          console.log("Command error! The rover doesn't move.");
          break;
      }
    }
  for(var i=0;i<rovers.length;i++){
    console.log(rovers[i].name + " has traveled over the following spaces:");
    for(var m=0;m<rovers[i].travelLog.length;m++){
      console.log(String(rovers[i].travelLog[m]));
    }
  }
}

//Execution
var listOfCommands = "rflrfflfrfffffffffflrfffffbfrfbffflfbbff";
commands(listOfCommands,rovers,obstacles,board);