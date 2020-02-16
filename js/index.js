//import Graph from './Graph';

var gameCanvas = document.getElementById("gameCanvas");
var ctx = gameCanvas.getContext("2d");
resetScreen();

var lastFrameTimeMs = 0, maxFPS = 60;
var sim;
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

function calculateSpeed() {
    // TODO - fix
    // progressivly increse speed up to max monitor fps rate
    return maxFPS + (snake.position.length/((gameCanvas.width/10)*(gameCanvas.height/10)))
}

function start() {
    const snakeX = (gameCanvas.width/10)/2;
    const snakeY = (gameCanvas.height/10)/2;
    snake = new Snake(new Point(snakeX, snakeY));
    const pos = randomFreeBoadPosition();
    froot = new Point(pos.x, pos.y);

    if (true) {
        sim = new Simulator();
    } else {
        setUserKeyInteraction();
    }

    resetScreen();
    paintSnake();
    paintPoint(froot.x, froot.y, "green");
    requestAnimationFrame(gameLoop);
}

function gameLoop(timestamp) {

    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        requestAnimationFrame(gameLoop);
        return;
    }
    lastFrameTimeMs = timestamp;

    if (true) {
        sim.moveSnake();
    }

    snake.moveSnake();
    snake.isSafe = snake.isSnakeSafe()

    if (snake.head.equals(froot)) {
        snake.growSnake();
        const pos = randomFreeBoadPosition();
        froot.x = pos.x;
        froot.y = pos.y;
        maxFPS = calculateSpeed();
        //console.log(maxFPS);
    }

    resetScreen();

    if (!snake.isSafe) { 
        paintEndGame();
        return;
    }

    paintSnake();
    paintPoint(froot.x, froot.y, "green");
    requestAnimationFrame(gameLoop);
}

function setUserKeyInteraction() {
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
}

class Snake {

    constructor(head) {
        this.head = head;
        this.xDirection = 1;
        this.yDirection = 0;
        this. xVelocity = 1;
        this. yVelocity = 0;
        this. isSafe = true;
        this.position = [new Point(head.x-2, head.y), new Point(head.x-1, head.y), head];
    }

    moveSnake() {
        const newHead = new Point(this.head.x + this.xVelocity, this.head.y + this.yVelocity);
        this.xDirection = this.xVelocity;
        this.yDirection = this.yVelocity;
        this.position.shift();
        this.head = newHead;
        this.position.push(newHead);
    }

    isSnakeSafe() {
        if (this.head.x >= gameCanvas.width/10 || this.head.x < 0 || this.head.y >= gameCanvas.height/10 || this.head.y < 0) {
            return false;
        }
        for (var i = 0; i < this.position.length - 1; ++i) {
            const position = this.position[i];
            if (this.head.equals(position)) {
                return false;
            }
        }
        return true;
    }
    
    growSnake() {
        this.position.push(new Point(this.head.x, this.head.y));
    }
}

class Point {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isDiscovered = false;
        this.parent = null;
    }

    equals(point) {
        if (this.x == point.x && this.y == point.y) {
            return true;
        }
        return false;
    }

    isRightOf(oriant) {
        const point = new Point(oriant.x + 1, oriant.y);
        return point.equals(this);
    }

    isLeftOf(oriant) {
        const point = new Point(oriant.x - 1, oriant.y);
        return point.equals(this);
    }

    isBelowOf(oriant) {
        const point = new Point(oriant.x, oriant.y + 1);
        return point.equals(this);
    }

}

class Simulator {

    constructor(snake) {
        this.graph = this.generateGraph();
        this.index = -1;
        this.path = [];
    }

    moveSnake() {
        if (this.index < 0) {
            this.path = BFS.search(this.graph, snake.head, froot);
            this.resetGraph();

            if (typeof path == undefined) {
                this.index = -1;
            } else {
                this.index = this.path.length-2;
            }
        }

        this.chooseNextMove();

        this.index = this.index - 1;
    }

    chooseNextMove() {
        if (this.path != null) {
            if (this.path[this.index].isRightOf(snake.head)) {
                snake.xVelocity = 1;
                snake.yVelocity = 0;
            } else if (this.path[this.index].isLeftOf(snake.head)) {
                snake.xVelocity = -1;
                snake.yVelocity = 0;
            } else if (this.path[this.index].isBelowOf(snake.head)) {
                snake.xVelocity = 0;
                snake.yVelocity = 1;
            } else {
                snake.xVelocity = 0;
                snake.yVelocity = -1;
            }
        }
    }

    generateGraph() {
        var graph = new Graph();
        var p = [];
        const width = gameCanvas.width/10;
        const height = gameCanvas.height/10;
        for (x = 0; x < width; ++x) {
            p.push([]);
            for  (y = 0; y < height; ++y) {
                const tempP = new Point(x, y);
                p[x].push(tempP);
                graph.addVertex(tempP);
            }
        }
        for (x = 0; x < width; ++x) {
            for  (y = 0; y < height; ++y) {
                if (y-1 >= 0) graph.addEdge(p[x][y], p[x][y - 1]);
                if (x+1 < width) graph.addEdge(p[x][y], p[x + 1][y]);
                if (y+1 < height) graph.addEdge(p[x][y], p[x][y + 1]);
                if (x-1 >= 0) graph.addEdge(p[x][y], p[x - 1][y]);
            }
        }
        return graph;
    }

    resetGraph() {
        this.graph.map.forEach((value, key) => {
            key.isDiscovered = false;
            key.parent = null;
        });
    }
}

class Graph {
    constructor() {
        this.map = new Map();
    }

    addVertex(v) {
        this.map.set(v, []);
    }

    addEdge(v, w) {
        this.map.get(v).push(w);
    }

    getVertex(v) {
        for (let key of this.map) {
            if (v.equals(key[0])) {
                return key[0];
            }
        }
    }
}

let BFS = {
    search(graph, root, goal) {
        snake.position.forEach((point) => {
            graph.getVertex(point).isDiscovered = true;
        })

        const r = graph.getVertex(root);
        var q = [];
        r.isDiscovered = true;
        q.push(r);

        while(q.length != 0) {
            const p = q.shift();
            if (p.equals(goal)) {
                return this.backtrack(p);
            }
            graph.map.get(p).forEach((vertex) => {
                if (vertex.isDiscovered == false) {
                    vertex.parent = p;
                    vertex.isDiscovered = true;
                    q.push(vertex);
                }
            });
        }
    },
    backtrack(end) {
        var trace = [];
        trace.push(end);
        var point = end;
        while (point.parent != null) {
            trace.push(point.parent);
            point = point.parent;
        }
        return trace;
    }
}