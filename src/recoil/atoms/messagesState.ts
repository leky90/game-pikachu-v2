import { atom } from "recoil";
import { ChatTypeState, MessagesState } from "../../types/chat";

const messagesState = atom<MessagesState>({
  key: ChatTypeState.MESSAGES_STATE,
  default: {
    messages: [],
  },
});

export default messagesState;
