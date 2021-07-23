export enum ChatTypeState {
  MESSAGES_STATE = "MESSAGES_STATE",
}

export type Message = {
  channel: string;
  content: string;
};

export interface MessagesState {
  messages: Message[];
}

export const BASE_WS_URL = "wss://pokemon-game.ldktech.com/websocket";
// export const BASE_WS_URL = "ws://localhost:8080";
