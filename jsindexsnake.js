var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

//class to maintain the snake length and keep on increasing it's size
class SnakeBody {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

var speed = 10; //15 20

//30 squares along X and Y, each of 20px
var blockCount = 30; 

//-2 because we don't wan't that the snake and the food item occupies the enire 25px of the block
var elementSizeOnTile = canvas.width / blockCount - 2; 
var headX = 15;
var headY = 15;

//the velocities along the two direction
var xVelocity = 0;
var yVelocity = 0;

//block number of snake's food along X and Y direction
var appleX = 7;
var appleY = 7;

//store the score of the player
var score = 0;

var snakeBody = [];
//length of snake body, initially set to zero
var snakeLength = 0;

function drawGame() {

    //to show the changed position of snake on the screen
    changeSnakePosition();

    //check if the player is out because of hitting its own body or the wall
    var result = gameOver();
    if(result) {
        var audio = new Audio("soundsnake/dead.mp3");
        audio.play();
        document.getElementById("text").innerHTML = "Press Any Key to Restart";
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 100);
        
        return;
    }

    //till the time next evnt listner does not get detected, the snake would continue to move in the same direction with the function getting recalled and the screen getting refreshed at the interval of 1000/speed.
    console.log("hey");
    //Draw a background of canvas
    clearScreen();
    
    //draw the apple at different canvass position
    drawApple();
    drawSnake();
    //check if the snake eats the food
    collisionCheck();
    //In one second, screen gets refreshed 7 times.
    setTimeout(drawGame, 1000/speed);
}

function gameOver() {
    if(headX < 0 || headX === blockCount || headY < 0 || headY === blockCount) {
        $("#score").css("color", "rgb(184,0,0");
        return true;
    } 

    //check through snake's body
    for(var i = 0; i < snakeBody.length; i++) {
        var part = snakeBody[i];
        if(part.x === headX && part.y === headY){
            $("#score").css("color", "rgb(184,0,0");
            return true;
        }
    }
}

function clearScreen() {
    context.fillStyle = "black"; //paint brush of black color
    //(x, y, length along x to be painted, length along y to be painted)
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function changeSnakePosition() {
    headX =  headX + xVelocity;
    headY =  headY + yVelocity;
}

function collisionCheck() {
    if(headX === appleX && headY === appleY){
        //play the gulp sound
        var audio = new Audio("soundsnake/eat.mp3");
        audio.play();
        //increase the score of player
        score++;
        document.getElementById("score").innerHTML = "Score: " + score;
        //increase the snake speed as per the apple's consumed
        increaseSnakeSpeed(score);
        //generate new apple's block nuber along X and Y
        appleX = Math.floor(Math.random()*29) + 1;
        appleY = Math.floor(Math.random()*29) + 1;
        snakeLength++;
    }
    
}

function drawApple() {
    context.fillStyle="red";
    context.fillRect(appleX*20, appleY*20, elementSizeOnTile, elementSizeOnTile);
}

function drawSnake() {
    context.fillStyle="green";
    for(var i = 0; i < snakeBody.length; i++) {
        var part = snakeBody[i];
        context.fillRect(part.x*20, part.y*20, elementSizeOnTile, elementSizeOnTile);
    }

    //stores the block number along x and y 
   
    snakeBody.push(new SnakeBody(headX, headY));
    
    if(snakeBody.length > snakeLength) {
        snakeBody.shift();//farthest snake's body block gets removed 
    }

    context.fillStyle="orange";
    context.fillRect(headX*20, headY*20, elementSizeOnTile, elementSizeOnTile);
}

function increaseSnakeSpeed(score) {
    if(score >= 15) {
        speed = 15;
    }
    else if(score >= 25) {
        speed = 20;
    }
    else if(score >= 40) {
        speed = 35;
    }
    else if(speed >= 50) {
        speed = 45;
    }
}

drawGame();

document.addEventListener("keydown", keyDown);

function keyDown(event) {
    console.log(event.keyCode);
     //Up direction
     if(event.keyCode === 38) {
        //the sanke is not allowed to move up if its Y-velocity is already set to something != 0
        if(yVelocity !== 0) {
            return;
        } 
        var audio = new Audio("soundsnake/up.mp3");
        audio.play();
        yVelocity = -1;
        xVelocity = 0;
    }
    //Down direction
    else if(event.keyCode === 40) {
        //the snake is not allowed to move down if its Y-velocity is already set to something != 0
        if(yVelocity !== 0) {
            return;
        }
        var audio = new Audio("soundsnake/down.mp3");
        audio.play();
        yVelocity = 1;
        xVelocity = 0;
    }
    //Right direction
    else if(event.keyCode === 39) {
        //the sanke is not allowed to move right if its Y-velocity is already set to something != 0
        if(xVelocity !== 0) {
            return;
        }
        var audio = new Audio("soundsnake/right.mp3");
        audio.play();
        xVelocity = 1;
        yVelocity = 0;
    }
    //Left direction
    else if(event.keyCode === 37) {
        //the sanke is not allowed to move left if its Y-velocity is already set to something != 0
        if(xVelocity !== 0) {
            return;
        }
        var audio = new Audio("soundsnake/left.mp3");
        audio.play();
        xVelocity = -1;
        yVelocity = 0;
    }
    else {
        restart();
    }
}

function restart() {
    //reset all the values. Put them equal to the initial values with which we started the game.
    document.getElementById("text").innerHTML = "Hungry Snake";
    $("#score").css("color", "white");
    document.getElementById("score").innerHTML = "Score: 0";
    score =0 ;
    snakeLength =0;
    snakeBody = [];
    speed = 10; 
    blockCount = 30; 
    elementSizeOnTile = canvas.width / blockCount - 2; 
    headX = 15;
    headY = 15;
    xVelocity = 0;
    yVelocity = 0;
    appleX = 7;
    appleY = 7;
    //calling the function again the start the game all over again
    drawGame();
}