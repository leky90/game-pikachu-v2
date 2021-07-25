import { atom } from "recoil";
import { GameTypeState } from "../../types/game";

const gameSupportState = atom<{ supported: boolean; tutorial: boolean }>({
  key: GameTypeState.GAME_SUPPORT_STATE,
  default: {
    supported: false,
    tutorial: false,
  },
});

export default gameSupportState;
