class Simulator {

    constructor(snake, ) {
        this.graph = new Graph();
    }

    getMove() {

    }

    generateGraph() {
        for (x = 0; x < 10; ++x) {
            for  (y = 0; y < 10; ++y) {
                this.graph.addVertex({x: x, y: y, weight: -1, discovered: false});
            }
        }
        for (x = 0; x < 10; ++x) {
            for  (y = 0; y < 10; ++y) {
                // if (y-1 >= 0) this.graph.addEdge(p[x][y], p[x][y - 1], false);
                // if (x+1 < board.getWidth()) this.graph.addEdge(p[x][y], p[x + 1][y], false);
                // if (y+1 < board.getHeight()) this.graph.addEdge(p[x][y], p[x][y + 1], false);
                // if (x-1 >= 0) this.graph.addEdge(p[x][y], p[x - 1][y], false);
            }
        }
    }

    resetGraph() {

    }
}