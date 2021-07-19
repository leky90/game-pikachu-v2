import { FC } from "react";
import { PointCoords, Pokemon } from "../../types/game";
import { checkPointInLine } from "../../utils/game";
import LineCard from "./LineCard";

type LineRowProps = {
  cards: Pokemon[] | number[];
  rowIndex: number;
  connectingLinePoints: PointCoords[];
};

const LineRow: FC<LineRowProps> = ({
  cards,
  rowIndex,
  connectingLinePoints,
}) => {
  return (
    <>
      {cards.map((_, colIndex) => (
        <LineCard
          key={`card-${colIndex}`}
          rowIndex={rowIndex}
          colIndex={colIndex}
          point={checkPointInLine(connectingLinePoints, { rowIndex, colIndex })}
        />
      ))}
    </>
  );
};

export default LineRow;
