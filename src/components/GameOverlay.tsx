import { FC } from "react";
import LineRow from "./Game/LineRow";
import useGameOverlayEngine from "../hooks/useGameOverlayEngine";

type GameOverlayProps = {};

const GameOverlay: FC<GameOverlayProps> = () => {
  const { connectingLinePoints, matrix, row, col } = useGameOverlayEngine();

  const columnCards = new Array(col + 2).fill(false);

  return (
    <div className={`game-overlay board-${row}x${col}`}>
      {matrix &&
        matrix.map((_, index) => (
          <LineRow
            key={`row-${index}`}
            cards={columnCards}
            rowIndex={index}
            connectingLinePoints={connectingLinePoints}
          />
        ))}
    </div>
  );
};

export default GameOverlay;
