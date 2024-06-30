import "./index.css";

const Node = ({ isFinish, isStart }) => {
  const nodeClassName = isFinish ? "finish" : isStart ? "start" : "";

  return <div className={`node ${nodeClassName}`}></div>;
};

export default Node;

export const DEFAULT_NODE = {
  row: 0,
  col: 0,
};
