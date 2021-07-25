import { useRecoilState, useRecoilValue } from "recoil";
import gameState from "../recoil/atoms/gameState";
import gameOverlayState from "../recoil/atoms/gameOverlayState";

export default function useGameOverlayEngine() {
  const [
    { connectingLinePoints, suggestPoints, freezing },
    setGameOverlayState,
  ] = useRecoilState(gameOverlayState);
  const { matrix, row, col, status } = useRecoilValue(gameState);

  return {
    connectingLinePoints,
    suggestPoints,
    matrix,
    row,
    col,
    status,
    freezing,
    setGameOverlayState,
  };
}
