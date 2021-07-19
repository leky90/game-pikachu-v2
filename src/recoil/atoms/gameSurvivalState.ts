import { atom } from "recoil";
import { GameStatus, GameTypeState } from "../../types/game";

const gameSurvivalState = atom({
  key: GameTypeState.SURVIVAL_MODE,
  default: {
    status: GameStatus.PENDING,
  },
});

export default gameSurvivalState;
