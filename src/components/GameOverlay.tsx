import LineRow from "./Game/LineRow";
import useGameOverlayEngine from "../hooks/useGameOverlayEngine";
import { useEffect } from "react";
import { FREEZING_TIME } from "../types/game";

const GameOverlay = () => {
  const {
    connectingLinePoints,
    suggestPoints,
    matrix,
    row,
    col,
    freezing,
    setGameOverlayState,
  } = useGameOverlayEngine();

  const columnCards = new Array(col + 2).fill(false);
  const freezingClass = freezing ? "freezing-board" : "";

  useEffect(() => {
    if (freezing) {
      setTimeout(() => {
        setGameOverlayState((gameOverlayState) => ({
          ...gameOverlayState,
          freezing: false,
        }));
      }, FREEZING_TIME * 1000);
    }
  }, [freezing]);

  return (
    <div className={`game-overlay board-${row}x${col} ${freezingClass}`}>
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
