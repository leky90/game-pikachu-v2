import { useRecoilValue, useSetRecoilState } from "recoil";
import gameState from "../recoil/atoms/gameState";
import gameOverlayState from "../recoil/atoms/gameOverlayState";
import { useEffect } from "react";
import gameSoundState from "../recoil/atoms/gameSoundState";
import { BONUS_TIME, GameMode, PENALTY_TIME } from "../types/game";
import gameTimingState from "../recoil/atoms/gameTimingState";

export default function useGameOverlayEngine(mode: GameMode) {
  const { connectingLinePoints } = useRecoilValue(gameOverlayState);
  const { matrix, row, col, status } = useRecoilValue(gameState);
  const { playRisingPopSound, playGlugSound } = useRecoilValue(gameSoundState);
  const setGameTiming = useSetRecoilState(gameTimingState);

  useEffect(() => {
    if (connectingLinePoints.length === 1) {
      playGlugSound && playGlugSound();
      if (mode === GameMode.SPEED_MODE) {
        setGameTiming((gameTiming) => ({
          timing: gameTiming.timing + PENALTY_TIME,
        }));
      }
      if (mode === GameMode.SURVIVAL_MODE) {
        setGameTiming((gameTiming) => ({
          ...gameTiming,
          timing: gameTiming.timing - PENALTY_TIME,
        }));
      }
    }
    if (connectingLinePoints.length > 1) {
      playRisingPopSound && playRisingPopSound();
      if (mode === GameMode.SURVIVAL_MODE) {
        setGameTiming((gameTiming) => ({
          ...gameTiming,
          timing: gameTiming.timing + BONUS_TIME,
        }));
      }
    }
  }, [connectingLinePoints]);

  return {
    connectingLinePoints,
    matrix,
    row,
    col,
    status,
  };
}
