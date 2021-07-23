import { FC } from "react";
import { PointCoords, Pokemon } from "../../types/game";
import { checkPointInLine } from "../../utils/game";
import LineCard from "./LineCard";

type LineRowProps = {
  cards: Pokemon[] | number[];
  rowIndex: number;
  connectingLinePoints: PointCoords[];
  suggestPoints: [PointCoords | undefined, PointCoords | undefined];
};

const LineRow: FC<LineRowProps> = ({
  cards,
  rowIndex,
  connectingLinePoints,
  suggestPoints,
}) => {
  return (
    <>
      {cards.map((_, colIndex) => (
        <LineCard
          key={`card-${colIndex}`}
          rowIndex={rowIndex}
          colIndex={colIndex}
          point={checkPointInLine(connectingLinePoints, { rowIndex, colIndex })}
          suggested={
            suggestPoints &&
            suggestPoints.findIndex(
              (suggestPoint) =>
                suggestPoint?.rowIndex === rowIndex &&
                suggestPoint?.colIndex === colIndex
            ) >= 0
          }
        />
      ))}
    </>
  );
};

export default LineRow;
