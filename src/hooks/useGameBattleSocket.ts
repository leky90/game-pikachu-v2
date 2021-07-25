import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import {
  GameBattleEffect,
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
      event: GameSocketEvents.INCREASE_COMPETITOR_POINTS,
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

  const sendIncreasePoints = () => {
    const messageJson: GameSocketMessage = {
      ...baseMessageJson,
      event: GameSocketEvents.INCREASE_COMPETITOR_POINTS,
    };
    sendJsonMessage(messageJson);
  };

  const sendDecreasePoints = () => {
    const messageJson: GameSocketMessage = {
      ...baseMessageJson,
      event: GameSocketEvents.DECREASE_COMPETITOR_POINTS,
    };
    sendJsonMessage(messageJson);
  };

  const sendGameEffect = (effect: GameBattleEffect) => {
    switch (effect) {
      case GameBattleEffect.FREEZE:
        const freeJson: GameSocketMessage = {
          ...baseMessageJson,
          event: GameSocketEvents.FREEZE_COMPETITOR_BOARD,
        };
        sendJsonMessage(freeJson);
        break;

      default:
        const levelUpJson: GameSocketMessage = {
          ...baseMessageJson,
          event: GameSocketEvents.LEVEL_UP_POINTS,
        };
        sendJsonMessage(levelUpJson);
        break;
    }
  };

  return {
    sendReadyGame,
    sendUnReadyGame,
    sendQuitGame,
    sendSelectedPokemon,
    sendJoinedGame,
    sendDecreasePoints,
    sendIncreasePoints,
    sendGameEffect,
  };
}
