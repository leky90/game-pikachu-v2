import { atom } from "recoil";
import { GameOverlayState, GameTypeState } from "../../types/game";

const gameOverlayState = atom<GameOverlayState>({
  key: GameTypeState.GAME_OVERLAY_STATE,
  default: {
    connectingLinePoints: [],
  },
});

export default gameOverlayState;
