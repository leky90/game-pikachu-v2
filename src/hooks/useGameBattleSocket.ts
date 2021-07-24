import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import {
  GameSocketEvents,
  GameSocketMessage,
  SocketCommand,
} from "../types/game";

interface UseGameBattleSocketProps {
  sendJsonMessage: SendJsonMessage;
  gameId: string;
  player: string;
}

export default function useGameBattleSocket({
  sendJsonMessage,
  gameId,
  player,
}: UseGameBattleSocketProps) {
  const baseMessageJson: GameSocketMessage = {
    command: SocketCommand.SEND_MESSAGE,
    event: GameSocketEvents.READY,
    match: gameId,
    player,
  };
  const sendReadyGame = () => {
    const messageJson = {
      ...baseMessageJson,
      event: GameSocketEvents.READY,
    };
    sendJsonMessage(messageJson);
  };

  const sendUnReadyGame = () => {
    const messageJson: GameSocketMessage = {
      ...baseMessageJson,
      event: GameSocketEvents.UNREADY,
    };
    sendJsonMessage(messageJson);
  };

  const sendQuitGame = () => {
    const messageJson: GameSocketMessage = {
      ...baseMessageJson,
      event: GameSocketEvents.QUIT,
    };
    sendJsonMessage(messageJson);
  };

  const sendSelectedPokemon = (rowIndex: number, colIndex: number) => {
    const messageJson: GameSocketMessage = {
      ...baseMessageJson,
      event: GameSocketEvents.SELECTED_POKEMON,
    };
    sendJsonMessage(messageJson);
  };

  const sendJoinedGame = () => {
    const messageJson: GameSocketMessage = {
      ...baseMessageJson,
      event: GameSocketEvents.JOINED,
    };
    sendJsonMessage(messageJson);
  };

  return {
    sendReadyGame,
    sendUnReadyGame,
    sendQuitGame,
    sendSelectedPokemon,
    sendJoinedGame,
  };
}
