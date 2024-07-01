// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export const djikstra = (grid, startNode, finishNode) => {
  if (!grid.length || !startNode || !finishNode || startNode === finishNode)
    return;

  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length) {
    // sort nodes by distance
    sortNodesByDistance(unvisitedNodes);
    // extract the first node
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // Stops if the closest node's distance is infinity.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
};

const getAllNodes = (grid) => {
  const nodes = [];

  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

const sortNodesByDistance = (unvisitedNodes) => {
  unvisitedNodes.sort((a, b) => a.distance - b.distance);
};

const updateUnvisitedNeighbors = (closestNode, grid) => {
  const unvisitedNeighbors = getVisitedNeighbors(closestNode, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = closestNode.distance + 1;
    neighbor.previousNode = closestNode;
  }
};

const getVisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const { col, row } = node;

  // Check if there's a node above the current node
  if (row > 0) neighbors.push(grid[row - 1][col]);

  // Check if there's a node below the current node
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);

  // Check if there's a node to the right of the current node
  if (col > 0) neighbors.push(grid[row][col - 1]);

  // Check if there's a node to the right of the current node
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  // Return only those neighbors that haven't been visited
  return neighbors.filter((neighbor) => !neighbor.isVisited);
};

export const getShortestPathInOrder = (finishNode) => {
  let currentNode = finishNode;
  const nodesInShortestPathOrder = [];

  // Continue until there are no more previous nodes
  while (currentNode !== null) {
    // Add the current node to the beginning of the array
    nodesInShortestPathOrder.unshift(currentNode);
    // Move to the previous node
    currentNode = currentNode.previousNode;
  }

  // Return the nodes in the order of the shortest path
  return nodesInShortestPathOrder;
};
