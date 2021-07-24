import { nanoid } from "nanoid";
import { useEffect } from "react";
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

  const showInDevelopment = () => {
    playGlugSound && playGlugSound();
    alert(t("In development"));
  };

  const goToGameMatch = () => {
    playPopUpOnSound && playPopUpOnSound();
    const gameId = nanoid(8);
    const message = t("New game ID just created", { gameId });
    console.log("message", message, sendMakeGame);
    sendMakeGame && sendMakeGame(message);
    // setTimeout(() => {
    //   history.push(Routes.BATTLE_MODE_PAGE.replace(":gameId", gameId));
    // }, 3000);
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
            <button onClick={showInDevelopment}>
              {t("Find random match")}
            </button>
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
