import { FC, FormEventHandler, useState } from "react";
import { useTranslation } from "react-i18next";

interface ChatBoxProps {
  handleSubmit: FormEventHandler<HTMLFormElement>;
}

const ChatBox: FC<ChatBoxProps> = ({ handleSubmit }) => {
  const { t } = useTranslation();
  const [throttle, setThrottle] = useState(1);

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    if (throttle) {
      setThrottle(0);
      handleSubmit(event);
      setTimeout(() => {
        setThrottle(1);
      }, 300);
    } else {
      alert(t("Chat slowly please"));
    }
  };

  return (
    <div className="chat-box">
      <form onSubmit={onSubmit}>
        <input
          name="message"
          placeholder={t("Enter your message here...")}
          autoFocus
          autoComplete="off"
        />
      </form>
    </div>
  );
};

export default ChatBox;
