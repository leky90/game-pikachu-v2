import { atom } from "recoil";
import { GameTypeState } from "../../types/game";

const gameTimingState = atom<{ timing: number; yourTiming?: number }>({
  key: GameTypeState.GAME_TIMING_STATE,
  default: {
    timing: 0,
    yourTiming: 0,
  },
});

export default gameTimingState;
