import { FC, useEffect } from "react";
import Message from "./Message";
import { useRecoilState } from "recoil";
import messagesState from "../../recoil/atoms/messagesState";
import { nanoid } from "nanoid";

const MessagesBox: FC = () => {
  const [{ messages }, setMessages] = useRecoilState(messagesState);

  useEffect(() => {
    const messagesBox = document.getElementById("messages-box");
    if (messagesBox) {
      messagesBox.scrollTo({
        behavior: "smooth",
        top: messagesBox.scrollHeight,
      });
    }
    if (messages.length > 500) {
      setMessages({ messages: messages.slice(-400) });
    }
  }, [messages.length]);

  return (
    <div id="messages-box" className="messages-box">
      {messages.map((message, index) => {
        const nid = nanoid();
        return message && <Message key={nid} message={message.content} />;
      })}
    </div>
  );
};

export default MessagesBox;
