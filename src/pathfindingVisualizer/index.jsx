import { useState } from "react";
import Node from "./Node";
import { useEffect } from "react";
import "./index.css";
import {
  COLUMN_COUNT,
  FINISH_NODE_COLUMN,
  FINISH_NODE_ROW,
  ROW_COUNT,
  START_NODE_COLUMN,
  START_NODE_ROW,
} from "../data/constant";
import { djikstra, getShortestPathInOrder } from "../algorithm/dijkstra";

const PathfindingVisualizer = () => {
  const [grids, setGrids] = useState([]);

  useEffect(() => {
    const _grids = createInitialGrid();
    setGrids(_grids);
  }, []);

  const animateAlgorithm = (visitedNodesInOrder, shortedPathInOrder) => {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          animateShortestPath(shortedPathInOrder);
        }, 10 * i);
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) {
          element.className = "node visited";
        }
      }, 10 * i);
    }
  };

  const animateShortestPath = (shortedPathInOrder) => {
    for (let index = 0; index < shortedPathInOrder.length; index++) {
      setTimeout(() => {
        const node = shortedPathInOrder[index];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) {
          element.className = "node shortest-path";
        }
      }, 50 * index);
    }
  };

  const visualizeAlgorithm = () => {
    const startNode = grids[START_NODE_ROW][START_NODE_COLUMN];
    const finishNode = grids[FINISH_NODE_ROW][FINISH_NODE_COLUMN];
    const visitedNodesInOrder = djikstra(grids, startNode, finishNode);

    const shortedPathInOrder = getShortestPathInOrder(finishNode);

    animateAlgorithm(visitedNodesInOrder, shortedPathInOrder);
  };

  return (
    <>
      <button onClick={() => visualizeAlgorithm()}>
        Visualize Dijkstra Algorithm
      </button>
      <div className="grid">
        {grids.map((row, rowIdx) => {
          return (
            <div className="row" key={rowIdx}>
              {row.map(({ isFinish, isStart, row, col }, nodeIdx) => (
                <Node
                  key={`${rowIdx}-${nodeIdx}`}
                  isFinish={isFinish}
                  isStart={isStart}
                  row={row}
                  col={col}
                />
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PathfindingVisualizer;

const createInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < ROW_COUNT; row++) {
    const currentRow = [];
    for (let col = 0; col < COLUMN_COUNT; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (row, col) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COLUMN,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COLUMN,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};
