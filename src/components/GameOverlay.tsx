import { FC } from "react";
import LineRow from "./Game/LineRow";
import useGameOverlayEngine from "../hooks/useGameOverlayEngine";
import { GameMode } from "../types/game";

type GameOverlayProps = {
  mode: GameMode;
};

const GameOverlay: FC<GameOverlayProps> = ({ mode }) => {
  const { connectingLinePoints, suggestPoints, matrix, row, col } =
    useGameOverlayEngine(mode);

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
            suggestPoints={suggestPoints}
          />
        ))}
    </div>
  );
};

export default GameOverlay;
