import { atom } from "recoil";
import { GameBattlePointsState, GameTypeState } from "../../types/game";

const gameBattlePointsState = atom<GameBattlePointsState>({
  key: GameTypeState.GAME_BATTLE_POINTS_STATE,
  default: {
    competitorPoint: 0,
    yourPoint: 0,
  },
});

export default gameBattlePointsState;
