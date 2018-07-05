//CONSTRUCTOR FUNCTIONS

function Point(x, y) {
    this.x = x;
    this.y = y;
    this.m = 0;
}

function Transmitter(x, y, m) {
    this.x = x;
    this.y = y;
    this.m = m;
}

//FUNCTIONS

function setPoint() {
    const x = parseInt(prompt("Punkt. Podaj wartość na osi X"));
    const y = parseInt(prompt("Punkt. Podaj wartość na osi Y"));

    const point = new Point(x, y);

    return point;
}

function createTransmitter() {
    const x = parseInt(prompt("Nadajnik. Podaj wartość na osi X"));
    const y = parseInt(prompt("Nadajnik. Podaj wartość na osi Y"));
    const m = parseInt(prompt("Nadajnik. Podaj zasięg"));

    const transmitter = new Transmitter(x, y, m);
    return transmitter;
}

function setTransmitters(transmitters) {
    const transmitterNumber = parseInt(prompt("Podaj liczbę nadajników"));

    for (let i = 0; i < transmitterNumber; i++) {
        transmitters[i] = createTransmitter();
    }

    return transmitters;
}

function findCollisions(transmitters) {
    const startingPoint = setPoint();
    const landingPoint = setPoint();

    transmitters.unshift(startingPoint);
    transmitters.push(landingPoint);

    for (let i = 0; i < transmitters.length; ++i) {
        collisions[i] = [];
    }

    transmitters.forEach(function (transmitter, index) {
        for (let i = 0; i < transmitters.length; i++) {
            let dx = transmitter.x - transmitters[i].x;
            let dy = transmitter.y - transmitters[i].y;

            let distance = Math.sqrt(dx * dx + dy * dy);

            if (index !== i) {
                if (distance <= transmitter.m + transmitters[i].m) {
                    collisions[index].push(i)
                }
            }
        }
    });
}

function searchPath(start, nodes, fn) {
    (function path_recur(node, visited) {
        var adj = nodes[node];
        visited.push(node);
        fn(node);
        for (var i in adj) {
            var node = adj[i];
            if (0 >= visited.indexOf(node)) {
                path_recur(node, visited);
            }
        }
    })(start, []);
}

function isPath(arr) {
    let searchItem = collisions.length - 1;
    if (visited.indexOf(searchItem) !== -1) {
        console.log('Bezpieczny przelot quadrocopterem jest możliwy')
    } else {
        console.log('Bezpieczny przelot quadrocopterem nie jest możliwy')
    }
}

//EXECUTE


const transmitters = [];
const collisions = [];
const visited = [];
setTransmitters(transmitters);
findCollisions(transmitters)
searchPath(0, collisions, function (n) {
    visited.push(n);
});
isPath(visited);