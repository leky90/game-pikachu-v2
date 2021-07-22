import { useRecoilValue } from "recoil";
import gameState from "../recoil/atoms/gameState";
import gameOverlayState from "../recoil/atoms/gameOverlayState";
import { GameMode } from "../types/game";

export default function useGameOverlayEngine(mode: GameMode) {
  const { connectingLinePoints } = useRecoilValue(gameOverlayState);
  const { matrix, row, col, status } = useRecoilValue(gameState);

  return {
    connectingLinePoints,
    matrix,
    row,
    col,
    status,
  };
}
