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

const PathfindingVisualizer = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const temp = createInitialGrid();
    setNodes(temp);
  }, []);

  console.log({ nodes });
  return (
    <div className="grid">
      {nodes.map((row, rowIdx) => {
        return (
          <div className="row" key={rowIdx}>
            {row.map(({ isFinish, isStart }, nodeIdx) => (
              <Node
                key={`${rowIdx}-${nodeIdx}`}
                isFinish={isFinish}
                isStart={isStart}
              />
            ))}
          </div>
        );
      })}
    </div>
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
