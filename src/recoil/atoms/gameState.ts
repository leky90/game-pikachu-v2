import { atom } from "recoil";
import { GameStatus, GameState, GameTypeState } from "../../types/game";

const gameState = atom<GameState>({
  key: GameTypeState.GAME_STATE,
  default: {
    status: GameStatus.PENDING,
    row: 3,
    col: 4,
    pokemons: {},
    matrix: [],
  },
});

export default gameState;
