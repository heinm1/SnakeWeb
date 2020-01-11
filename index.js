
const CANVAS_BACKGROUND_COLOUR = "black";

var gameCanvas = document.getElementById("gameCanvas");
var ctx = gameCanvas.getContext("2d");

ctx.fillStyle=CANVAS_BACKGROUND_COLOUR;
ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

function start() {
    const SNAKE_COLOUR = "white";

    ctx.fillStyle=SNAKE_COLOUR;
    ctx.fillRect(250, 250, 10, 10);
}