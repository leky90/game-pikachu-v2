import { atom } from "recoil";
import { GameTypeState } from "../../types/game";

const gameSupportState = atom<{ supported: boolean }>({
  key: GameTypeState.GAME_SUPPORTSTATE,
  default: {
    supported: false,
  },
});

export default gameSupportState;
