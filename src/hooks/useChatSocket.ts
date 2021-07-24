import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { DEFAULT_CHANNEL } from "../types/chat";
import { ChatSocketMessage, SocketCommand } from "../types/game";

interface UseGameBattleSocketProps {
  sendJsonMessage: SendJsonMessage;
  player: string;
}

export default function useChatSocket({
  sendJsonMessage,
  player,
}: UseGameBattleSocketProps) {
  const baseMessageJson: ChatSocketMessage = {
    command: SocketCommand.SEND_MESSAGE,
    channel: DEFAULT_CHANNEL,
    player,
  };
  const sendMakeGame = (message: string) => {
    const messageJson = {
      ...baseMessageJson,
      content: message,
      timestamp: Date.now(),
    };
    sendJsonMessage(messageJson);
  };

  return {
    sendMakeGame,
  };
}
