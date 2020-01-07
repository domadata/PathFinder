//https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Algorithm
export function dijkstra(grid, startingPoint, finishPoint) {
    const visitedPath = []; // store the visited order
    const unvisited = grid.flat(); // 1. [..., Create a set of all the unvisited nodes called the unvisited set.]
    startingPoint.distance = 0; // 2. Assign to every node a tentative distance value: set it to zero for our initial node <- and to infinity for all other nodes -> already done

    while (unvisited.length && true) { //while we still have unvisited
        const current = sortUnvisited(unvisited).shift(); // remove / take the object with the shortest distance
        if (current.isWall) continue; // if it is a Wall we skip
        if (current.isVisited) return visitedPath; // 5. [If the destination node has been marked visited..., then stop]
        if (current.distance === Infinity) return visitedPath; //if the smallest tentative distance among the nodes in the unvisited set is infinity then stop
        current.isVisited = true; // we mark it visited
        visitedPath.push(current); // push it to our path
        if (current === finishPoint) return visitedPath; // it is our finish point we stop
        updateUnvisited(current, grid); // update the distance of the neighbour
    }
}

function updateUnvisited(current, grid) {
    const { row, col, distance } = current; // row, col and distance of our current
    if (row < grid.length - 1) grid[row + 1][col].distance = distance + 1;
    if (row > 0) grid[row - 1][col].distance = distance + 1;
    if (col < grid[0].length - 1) grid[row][col + 1].distance = distance + 1; // since our grid is an array of an array grid.length are the numbers of rows grid[0].length are the number of columns
    if (col > 0) grid[row][col - 1].distance = distance + 1;
    // We set the distance of the neighbours of our current to the distance of our current + 1 since they are 1 block away...
}

function sortUnvisited(grid) {
    return grid.sort((a, b) => a.distance > b.distance); // sort the objects by distance
}