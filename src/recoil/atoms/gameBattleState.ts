import { ReadyState } from "react-use-websocket";
import { atom } from "recoil";
import { GameBattleState, GameTypeState } from "../../types/game";

const gameBattleState = atom<GameBattleState>({
  key: GameTypeState.GAME_BATTLE_STATE,
  default: {
    gameId: undefined,
    allReady: [],
    competitor: undefined,
    winner: undefined,
    socketStatus: ReadyState.UNINSTANTIATED,
    sendSelectedPokemon: undefined,
    sendReadyGame: undefined,
    sendUnReadyGame: undefined,
    sendQuitGame: undefined,
    sendJoinedGame: undefined,
    sendDecreasePoints: undefined,
    sendIncreasePoints: undefined,
    sendGameEffect: undefined,
  },
});

export default gameBattleState;
