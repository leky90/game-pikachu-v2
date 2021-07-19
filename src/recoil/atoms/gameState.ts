import { atom } from "recoil";
import {
  GameStatus,
  GameState,
  GameTypeState,
  GameLevel,
} from "../../types/game";

const gameState = atom<GameState>({
  key: GameTypeState.GAME_STATE,
  default: {
    status: GameStatus.PENDING,
    row: 3,
    col: 4,
    pokemons: {},
    matrix: [],
    level: GameLevel.LEVEL_1,
  },
});

export default gameState;
