import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import playerState from "../../recoil/atoms/playerState";
import { Routes } from "../../routes/CONSTANTS";
import { getPlayerID, getPlayerName } from "../../utils/game";
import { dateTimeFromTimestamp } from "../../utils/time";

interface MessageProps {
  message: string;
}

const Message: FC<MessageProps> = ({ message }) => {
  const { player } = useRecoilValue(playerState);
  const { t } = useTranslation();
  const history = useHistory();

  let gameId: string | undefined = undefined;
  try {
    const { name, content, timestamp } = JSON.parse(message);
    const matched = content.match(/ID - `([^`]{8})`$/);
    if (matched && matched[1]) {
      gameId = matched[1];
    }
    const selfClass = player === name ? "self" : "";
    const joinGame = () => {
      if (gameId) {
        history.push(Routes.BATTLE_MODE_PAGE.replace(":gameId", gameId));
      }
    };

    return (
      <div className={`message ${selfClass}`}>
        <small className="message-name">
          {getPlayerName(name)} <em>(ID: {getPlayerID(name)})</em>
        </small>
        <strong className="message-content">
          {content.replace(/ID - `([^`]{8})`$/, "")}{" "}
          {gameId && (
            <em onClick={joinGame} className="button button-join-game">
              <span className="hidden-mobile">{t("Join")}:</span> {gameId}
            </em>
          )}
        </strong>
        <small className="message-date">
          <em>{dateTimeFromTimestamp(timestamp)}</em>
        </small>
      </div>
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

function isOldMessage(prevProps: MessageProps, nextProps: MessageProps) {
  return prevProps.message === nextProps.message;
}

export default memo(Message, isOldMessage);
