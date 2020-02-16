export class Graph {
    constructor() {
        this.size = 0;
        this.map = new Map();
    }

    addVertex(v) {
        this.map.set(v, []);
    }

    addEdge(v, w) {
        this.map.get(v).push(w);
    }
}