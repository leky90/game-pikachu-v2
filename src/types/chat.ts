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
