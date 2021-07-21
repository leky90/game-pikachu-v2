import { FC, useEffect } from "react";
import Message from "./Message";
import { useRecoilValue } from "recoil";
import messagesState from "../../recoil/atoms/messagesState";

const MessagesBox: FC = () => {
  const { messages } = useRecoilValue(messagesState);

  useEffect(() => {
    const messagesBox = document.getElementById("messages-box");
    if (messagesBox) {
      messagesBox.scrollTo({
        behavior: "smooth",
        top: messagesBox.scrollHeight,
      });
    }
  }, [messages.length]);

  return (
    <div id="messages-box" className="messages-box">
      {messages.map(
        (message, index) =>
          message && <Message key={index} message={message.content} />
      )}
    </div>
  );
};

export default MessagesBox;
