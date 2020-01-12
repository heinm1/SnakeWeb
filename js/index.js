

var gameCanvas = document.getElementById("gameCanvas");
var ctx = gameCanvas.getContext("2d");
resetScreen();

function resetScreen() {
    ctx.fillStyle="black";
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function randomNumber() {
    return Math.round(Math.random() * 50);
}


var count = 0;

var froot = {
    x: randomNumber(),
    y: randomNumber()
}

var snake = {
    x: 2,
    y: 0,
    xVelocity: 1,
    yVelocity: 0,
    isSafe: true,
    position: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}]
}

function moveSnake() {
    snake.x = snake.x + snake.xVelocity;
    snake.y = snake.y + snake.yVelocity;
    snake.position.shift();
    snake.position.push({x: snake.x, y: snake.y});

    if (snake.x > 49 || snake.x < 0 || snake.y > 49 || snake.y < 0) {
        snake.isSafe = false;
    }
}

function growSnake() {
    snake.position.push({x: snake.x, y: snake.y});
}

function paintSnake() { 
    snake.position.forEach(p => {
        paintPoint(p.x, p.y, "white")
    });
}

function paintPoint(x, y, colour) {
    ctx.fillStyle=colour;
    ctx.fillRect(x * 10, y * 10, 10, 10);
}

function gameLoop() {

    if (snake.isSafe) {
        requestAnimationFrame(gameLoop);
    }

    // slow game loop to 15 fps instead of 60 (60/15 = 4)
    if (++count < 4) {
        return;
    } 

    count = 0;

    resetScreen();
    moveSnake();

    if (snake.x == froot.x && snake.y == froot.y) {
        growSnake();
        froot.x = randomNumber();
        froot.y = randomNumber();
    }

    paintSnake();
    paintPoint(froot.x, froot.y, "green");
}

// listen to keyboard events to move the snake
document.addEventListener('keydown', function(e) {
    // left arrow key
    if (e.which === 37 && snake.xVelocity === 0) {
      snake.xVelocity = -1;
      snake.yVelocity = 0;
    }
    // up arrow key
    else if (e.which === 38 && snake.yVelocity === 0) {
      snake.yVelocity = -1;
      snake.xVelocity = 0;
    }
    // right arrow key
    else if (e.which === 39 && snake.xVelocity === 0) {
      snake.xVelocity = 1;
      snake.yVelocity = 0;
    }
    // down arrow key
    else if (e.which === 40 && snake.yVelocity === 0) {
      snake.yVelocity = 1;
      snake.xVelocity = 0;
    }
  });
