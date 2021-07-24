import { atom } from "recoil";
import { ChatSocketState, GameTypeState } from "../../types/game";

const chatSocketState = atom<ChatSocketState>({
  key: GameTypeState.CHAT_SOCKET_STATE,
  default: {
    sendMakeGame: undefined,
  },
});

export default chatSocketState;
