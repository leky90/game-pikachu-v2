import { FC, memo, useEffect, useRef } from "react";
import { PointCoords } from "../../types/game";

type LineCardProps = {
  point?: PointCoords;
  rowIndex: number;
  colIndex: number;
};

const LineCard: FC<LineCardProps> = ({ point, rowIndex, colIndex }) => {
  const type = point && point.type ? `${point.type}-point` : "";
  const direction =
    point && point.direction ? `${point.direction}-direction` : "";
  const pointClass = point ? `in-line ${direction} ${type}` : "";
  const lineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      if (lineRef.current) {
        direction && lineRef.current.classList.remove(direction);
        type && lineRef.current.classList.remove(type);
      }
    }, 300);
    return () => {};
  }, [lineRef, direction, type]);

  return (
    <div ref={lineRef} className={`line-card ${pointClass}`}>
      <strong>
        {rowIndex},{colIndex}
      </strong>
    </div>
  );
};

function propsAreEquals(prevProps: LineCardProps, nextProps: LineCardProps) {
  if (prevProps.point === undefined && nextProps.point === undefined) {
    return true;
  }

  return (
    prevProps.point?.direction === nextProps.point?.direction &&
    prevProps.point?.type === nextProps.point?.type
  );
}

export default memo(LineCard, propsAreEquals);
