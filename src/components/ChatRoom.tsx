import {
  FC,
  FormEventHandler,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import gameSoundState from "../recoil/atoms/gameSoundState";
import messagesState from "../recoil/atoms/messagesState";
import playerState from "../recoil/atoms/playerState";
import ChatBox from "./Chat/ChatBox";
import MessagesBox from "./Chat/MessagesBox";
import ListActivePlayers from "./Chat/ListActivePlayers";
import { BASE_WS_URL, DEFAULT_CHANNEL } from "../types/chat";
import gameSupportState from "../recoil/atoms/gameSupportState";
import chatSocketState from "../recoil/atoms/chatSocketState";
import useChatSocket from "../hooks/useChatSocket";

interface ChatRoomProps {
  room: string;
}

const ChatRoom: FC<ChatRoomProps> = ({ room }) => {
  const { t } = useTranslation();
  const { player } = useRecoilValue(playerState);
  const [{ supported }, setSupport] = useRecoilState(gameSupportState);
  const { playPopUpOnSound } = useRecoilValue(gameSoundState);
  const setMessagesState = useSetRecoilState(messagesState);
  const setChatSocketState = useSetRecoilState(chatSocketState);
  const [socketUrl] = useState(`${BASE_WS_URL}/chat`);
  const { sendJsonMessage, readyState, lastJsonMessage, lastMessage } =
    useWebSocket(socketUrl, {
      reconnectAttempts: 30,
      reconnectInterval: 5000,
      retryOnError: true,
      shouldReconnect: () => true,
      queryParams: {
        username: player,
      },
      onOpen: () => {
        const helpMessage = {
          command: 2,
          channel: DEFAULT_CHANNEL,
          name: "PokeBot",
          content: t("Welcome to pokemon game!", { name: player }),
          timestamp: Date.now(),
        };
        sendJsonMessage(helpMessage);
        if (supported === false) {
          setTimeout(() => {
            const helpMessage = {
              command: 2,
              channel: DEFAULT_CHANNEL,
              name: "PokeBot",
              content: t(
                "(Help) Please click on make match to create your own match!",
                {
                  name: player,
                }
              ),
              timestamp: Date.now(),
            };
            setMessagesState(({ messages }) => ({
              messages: [
                ...messages,
                {
                  content: JSON.stringify(helpMessage),
                  channel: DEFAULT_CHANNEL,
                },
              ],
            }));
            setTimeout(() => {
              const helpMessage = {
                command: 2,
                channel: DEFAULT_CHANNEL,
                name: "PokeBot",
                content: t(
                  "(Help) You can click on a `Game ID` of others to join the match.",
                  {
                    name: player,
                  }
                ),
                timestamp: Date.now(),
              };
              setMessagesState(({ messages }) => ({
                messages: [
                  ...messages,
                  {
                    content: JSON.stringify(helpMessage),
                    channel: DEFAULT_CHANNEL,
                  },
                ],
              }));
              setSupport({ supported: true });
            }, 5000);
          }, 5000);
        }
      },
      onMessage: (event) => {
        playPopUpOnSound && playPopUpOnSound();
      },
      onClose: () => {
        const closeMessage = {
          command: 2,
          channel: DEFAULT_CHANNEL,
          name: "PokeBot",
          content: t("Sorry, I'm trying to connect our service again.", {
            name: player,
          }),
          timestamp: Date.now(),
        };
        setMessagesState(({ messages }) => ({
          messages: [
            ...messages,
            { content: JSON.stringify(closeMessage), channel: DEFAULT_CHANNEL },
          ],
        }));
      },
      onError: () => {
        const closeMessage = {
          command: 2,
          channel: DEFAULT_CHANNEL,
          name: "PokeBot",
          content: t(
            "Connect to service failed. Will try again in the next 5s. Please wait for it."
          ),
          timestamp: Date.now(),
        };
        setMessagesState(({ messages }) => ({
          messages: [
            ...messages,
            { content: JSON.stringify(closeMessage), channel: DEFAULT_CHANNEL },
          ],
        }));
      },
    });

  const reTryConnectSocket = () => {
    window.location.reload();
  };

  const { sendMakeGame } = useChatSocket({
    sendJsonMessage,
    player,
  });

  useEffect(() => {
    setChatSocketState((chatSocketState) => ({
      ...chatSocketState,
      sendMakeGame,
    }));
  }, [sendMakeGame]);

  useEffect(() => {
    lastJsonMessage &&
      setMessagesState(({ messages }) => ({
        messages: [...messages, lastJsonMessage],
      }));
  }, [lastMessage]);

  const handleClickSendMessage = useCallback((message) => {
    const messageJson = {
      command: 2,
      channel: DEFAULT_CHANNEL,
      name: player,
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
        <div className="chat-box-container">
          <MessagesBox />
          {readyState === ReadyState.OPEN && (
            <ChatBox handleSubmit={handleSubmit} />
          )}
          {[
            ReadyState.CLOSED,
            ReadyState.CLOSING,
            ReadyState.CONNECTING,
          ].includes(readyState) && (
            <div className="service-status">
              {t("Service is not available now.")}
              <strong className="clickable" onClick={reTryConnectSocket}>
                {t("Please try again")}
              </strong>
            </div>
          )}
        </div>
        <ListActivePlayers />
      </div>
    </div>
  );
};

function areEqualProps(prevProps: ChatRoomProps, nextProps: ChatRoomProps) {
  return prevProps.room === nextProps.room;
}

export default memo(ChatRoom, areEqualProps);
