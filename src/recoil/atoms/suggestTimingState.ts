import { atom } from "recoil";
import { GameTypeState } from "../../types/game";

const suggestTimingState = atom<number>({
  key: GameTypeState.GAME_SUGGEST_TIMING_STATE,
  default: 0,
});

export default suggestTimingState;
