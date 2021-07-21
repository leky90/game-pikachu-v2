import { FC, FormEventHandler, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useRecoilValue, useSetRecoilState } from "recoil";
import messagesState from "../recoil/atoms/messagesState";
import playerState from "../recoil/atoms/playerState";
import MessagesBox from "./Chat/MessagesBox";

interface ChatRoomProps {
  room: string;
}

const BASE_WS_URL = "wss://pokemon-game.ldktech.com:8080";

const ChatRoom: FC<ChatRoomProps> = ({ room }) => {
  const { t } = useTranslation();
  const { playerName } = useRecoilValue(playerState);
  const setMessagesState = useSetRecoilState(messagesState);
  const [socketUrl, setSocketUrl] = useState(
    `${BASE_WS_URL}/chat?username=${playerName}`
  );
  const { sendJsonMessage, readyState, lastJsonMessage, lastMessage } =
    useWebSocket(socketUrl);

  useEffect(() => {
    lastJsonMessage &&
      setMessagesState(({ messages }) => ({
        messages: [...messages, lastJsonMessage],
      }));
  }, [lastMessage]);

  const handleClickSendMessage = useCallback((message) => {
    const messageJson = {
      command: 2,
      channel: "general",
      name: playerName,
      content: message,
      timestamp: Date.now(),
    };
    sendJsonMessage(messageJson);
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const inputMessage = event.currentTarget.message;
    inputMessage.setAttribute("disabled", "true");
    const message = inputMessage.value.replace(
      /\b(dit|du|fuck|cu|dcm|dm|dcm)\b/g,
      "*"
    );
    if (message && message.trim() !== "") {
      handleClickSendMessage(message);
      inputMessage.value = "";
    } else {
      alert(t("Please enter your message"));
    }
    inputMessage.removeAttribute("disabled");
    inputMessage.focus();
  };

  return (
    <div className="chat-room">
      <div className="chat-container">
        {readyState === ReadyState.OPEN && (
          <>
            <MessagesBox />
            <div className="chat-box">
              <form onSubmit={handleSubmit}>
                <input
                  name="message"
                  placeholder={t("Enter your message here...")}
                  autoFocus
                />
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
