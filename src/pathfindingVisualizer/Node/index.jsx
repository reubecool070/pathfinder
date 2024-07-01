import PropTypes from "prop-types";
import "./index.css";

// eslint-disable-next-line react/prop-types
const Node = ({
  isFinish,
  isStart,
  isWall,
  row,
  col,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
}) => {
  const nodeClassName = isFinish
    ? "finish"
    : isStart
    ? "start"
    : isWall
    ? "wall"
    : "";

  return (
    <div
      onMouseDown={() => onMouseDown(row, col)}
      onMouseUp={() => onMouseUp(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      id={`node-${row}-${col}`}
      className={`node ${nodeClassName}`}
    ></div>
  );
};

export default Node;

Node.propTypes = {
  isWall: PropTypes.bool.isRequired,
  isFinish: PropTypes.bool.isRequired,
  isStart: PropTypes.bool.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
};
