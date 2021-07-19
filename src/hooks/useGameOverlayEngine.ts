import { useRecoilValue } from "recoil";
import gameState from "../recoil/atoms/gameState";
import gameOverlayState from "../recoil/atoms/gameOverlayState";

export default function useGameOverlayEngine() {
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
