import { nanoid } from "nanoid";
import { FormEventHandler, KeyboardEventHandler, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import ChatRoom from "../components/ChatRoom";
import SwitchLanguage from "../components/SwitchLanguage";
import Welcome from "../components/Welcome";
import chatSocketState from "../recoil/atoms/chatSocketState";
import gameBattleState from "../recoil/atoms/gameBattleState";
import gameSoundState from "../recoil/atoms/gameSoundState";
import { Routes } from "../routes/CONSTANTS";
import { DEFAULT_CHANNEL } from "../types/chat";

const MultiPlayerPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { playPopUpOnSound, playGlugSound } = useRecoilValue(gameSoundState);
  const resetGameBattle = useResetRecoilState(gameBattleState);
  const { sendMakeGame } = useRecoilValue(chatSocketState);

  useEffect(() => {
    resetGameBattle();
  }, []);

  const findRandomMatch = () => {
    playGlugSound && playGlugSound();
    alert(t("In development"));
  };

  const goToGameMatch = () => {
    playPopUpOnSound && playPopUpOnSound();
    const gameId = nanoid(8);
    const message = t("New game ID just created", { gameId });
    sendMakeGame && sendMakeGame(message);

    setTimeout(() => {
      history.push(Routes.BATTLE_MODE_PAGE.replace(":gameId", gameId));
    }, 200);
  };

  const enterMatchID: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const gameId = event.currentTarget.matchId.value;
    if (
      !event.currentTarget.matchId.value ||
      event.currentTarget.matchId.value.trim() === ""
    ) {
      playGlugSound && playGlugSound();
      alert(t("Please enter the right match ID"));
      return;
    }
    history.push(Routes.BATTLE_MODE_PAGE.replace(":gameId", gameId));
  };

  return (
    <div className="chat-board">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pika pika! - Multi player</title>
      </Helmet>
      <div className="game-board">
        <ChatRoom room={DEFAULT_CHANNEL} />
      </div>
      <div className="sidebar">
        <div className="game-info">
          <h1 className="game-title">{t("Multi player")}</h1>
          <Welcome />
        </div>
        <div>
          <div className="text-center">
            <button onClick={goToGameMatch}>{t("Make match")}</button>
            {/* <button onClick={findRandomMatch}>{t("Find random match")}</button> */}
            <div className="inline-button">
              <form onSubmit={enterMatchID}>
                <input
                  name="matchId"
                  maxLength={8}
                  placeholder={t("Enter match ID")}
                />
                <button>{t("Join")}</button>
              </form>
            </div>
            <Link to={Routes.MAIN_PAGE}>
              <button onClick={() => playPopUpOnSound && playPopUpOnSound()}>
                {t("Main menu")}
              </button>
            </Link>
          </div>
        </div>
        <p className="mobile-helper">{t("Scroll down to chat")}</p>
        <SwitchLanguage />
      </div>
    </div>
  );
};

export default MultiPlayerPage;
