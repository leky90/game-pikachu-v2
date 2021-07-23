import { FC, memo } from "react";
import { useRecoilValue } from "recoil";
import playerState from "../../recoil/atoms/playerState";
import { dateTimeFromTimestamp } from "../../utils/time";

interface MessageProps {
  message: string;
}

const Message: FC<MessageProps> = ({ message }) => {
  const { playerName } = useRecoilValue(playerState);
  try {
    const { name, content, timestamp } = JSON.parse(message);
    const selfClass = playerName === name ? "self" : "";
    return (
      <div className={`message ${selfClass}`}>
        <small className="message-name">
          {name.replace(/-.*$/g, "")} <em>(ID: {name.replace(/^.*-/g, "")})</em>
        </small>
        <strong className="message-content">{content}</strong>
        {/* <small className="message-date">
          <em>{dateTimeFromTimestamp(timestamp)}</em>
        </small> */}
      </div>
    );
  } catch {
    return null;
  }
};

function isOldMessage(prevProps: MessageProps, nextProps: MessageProps) {
  return prevProps.message === nextProps.message;
}

export default memo(Message, isOldMessage);
