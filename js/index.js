
var gameCanvas = document.getElementById("gameCanvas");
var ctx = gameCanvas.getContext("2d");
resetScreen();

var froot;
var snake;

function resetScreen() {
    ctx.fillStyle="black";
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function randomFreeBoadPosition() {
    var choice = [];
    for (x = 0; x < gameCanvas.width/10; ++x) {
        for (y = 0; y < gameCanvas.height/10; ++y) {
            const p = {x: x, y: y};
            const index = snake.position.findIndex(i => {
                return i.x === p.x && i.y === p.y;
            });
            if (index === -1) {
                choice.push(p);
            }
        }
    }
    return choice[Math.round(Math.random() * choice.length-1)];
}

function paintSnake() { 
    snake.position.forEach(p => {
        paintPoint(p.x, p.y, "white");
    });
}

function paintPoint(x, y, colour) {
    ctx.fillStyle=colour;
    ctx.fillRect(x * 10, y * 10, 10, 10);
}

function paintEndGame() {
    ctx.font = "20px Arial";
    ctx.fillText("Game Over", gameCanvas.width/2-50, gameCanvas.height/2);
}

function start() {
    resetScreen();
    const snakeX = (gameCanvas.width/10)/2;
    const snakeY = (gameCanvas.height/10)/2
    snake = {
        x: snakeX,
        y: snakeY,
        xDirection: 1,
        yDirection: 0,
        xVelocity: 1,
        yVelocity: 0,
        isSafe: true,
        position: [{x: snakeX-2, y: snakeY}, {x: snakeX-1, y: snakeY}, {x: snakeX, y: snakeY}],
        moveSnake: function() {
            snake.x = snake.x + snake.xVelocity;
            snake.y = snake.y + snake.yVelocity;
            snake.xDirection = snake.xVelocity;
            snake.yDirection = snake.yVelocity;
            snake.position.shift();
            snake.position.push({x: snake.x, y: snake.y});
        },
        isSnakeSafe: function() {
            if (snake.x >= gameCanvas.width/10 || snake.x < 0 || snake.y >= gameCanvas.height/10 || snake.y < 0) {
                return false;
            }
            for (i = 0; i < snake.position.length - 1; ++i) {
                const position = snake.position[i];
                if (position.x == snake.x && position.y == snake.y) {
                    return false;
                }
            }
            return true;
        },
        growSnake: function() {
            snake.position.push({x: snake.x, y: snake.y});
        }
    }
    const pos = randomFreeBoadPosition();
    froot = {
        x: pos.x,
        y: pos.y
    }
    gameLoop();
}

function gameLoop() {

    if (snake.isSafe) { 
        requestAnimationFrame(gameLoop);
    } else { 
        paintEndGame();
        return;
    }

    resetScreen();
    snake.moveSnake();
    snake.isSafe = snake.isSnakeSafe()

    if (snake.x == froot.x && snake.y == froot.y) {
        snake.growSnake();
        const pos = randomFreeBoadPosition();
        froot.x = pos.x;
        froot.y = pos.y;
    }

    paintSnake();
    paintPoint(froot.x, froot.y, "green");

}

// listen to keyboard events to move the snake
document.addEventListener('keydown', function(e) {
    // left arrow key
    if (e.which === 37 && snake.xVelocity === 0 && snake.xDirection === 0) {
      snake.xVelocity = -1;
      snake.yVelocity = 0;
    }
    // up arrow key
    else if (e.which === 38 && snake.yVelocity === 0 && snake.yDirection === 0) {
      snake.yVelocity = -1;
      snake.xVelocity = 0;
    }
    // right arrow key
    else if (e.which === 39 && snake.xVelocity === 0 && snake.xDirection === 0) {
      snake.xVelocity = 1;
      snake.yVelocity = 0;
    }
    // down arrow key
    else if (e.which === 40 && snake.yVelocity === 0 && snake.yDirection === 0) {
      snake.yVelocity = 1;
      snake.xVelocity = 0;
    }
  });
