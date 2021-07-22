import { FC, FormEventHandler, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useRecoilValue, useSetRecoilState } from "recoil";
import gameSoundState from "../recoil/atoms/gameSoundState";
import messagesState from "../recoil/atoms/messagesState";
import playerState from "../recoil/atoms/playerState";
import ChatBox from "./Chat/ChatBox";
import MessagesBox from "./Chat/MessagesBox";

interface ChatRoomProps {
  room: string;
}

// const BASE_WS_URL = "wss://pokemon-game.ldktech.com/websocket";
const BASE_WS_URL = "ws://localhost:8080";

const ChatRoom: FC<ChatRoomProps> = ({ room }) => {
  const { t } = useTranslation();
  const { playerName } = useRecoilValue(playerState);
  const { playPopUpOffSound } = useRecoilValue(gameSoundState);
  const setMessagesState = useSetRecoilState(messagesState);
  const [socketUrl] = useState(`${BASE_WS_URL}/chat`);
  const { sendJsonMessage, readyState, lastJsonMessage, lastMessage } =
    useWebSocket(socketUrl, {
      reconnectAttempts: 10,
      reconnectInterval: 3000,
      retryOnError: true,
      shouldReconnect: () => true,
      queryParams: {
        username: playerName,
      },
      onMessage: (event) => {
        playPopUpOffSound && playPopUpOffSound();
      },
    });

  const reTryConnectSocket = () => {
    window.location.reload();
  };

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
    // playPopUpOnSound();
    sendJsonMessage(messageJson);
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const inputMessage = event.currentTarget.message;
    inputMessage.setAttribute("disabled", "true");
    const message = inputMessage.value.replace(
      /\b(dit|du|fuck|cu|dcm|dm|dcm|cat)\b/g,
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
            <ChatBox handleSubmit={handleSubmit} />
          </>
        )}
        {readyState === ReadyState.CLOSED && (
          <div className="service-status">
            {t("Service is not available now.")}
            <strong className="clickable" onClick={reTryConnectSocket}>
              {t("Please try again")}
            </strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
