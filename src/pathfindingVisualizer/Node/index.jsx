import "./index.css";

// eslint-disable-next-line react/prop-types
const Node = ({ isFinish, isStart, row, col }) => {
  const nodeClassName = isFinish ? "finish" : isStart ? "start" : "";

  return (
    <div id={`node-${row}-${col}`} className={`node ${nodeClassName}`}></div>
  );
};

export default Node;
