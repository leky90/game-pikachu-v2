import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import ChatRoom from "../components/ChatRoom";
import SwitchLanguage from "../components/SwitchLanguage";
import Welcome from "../components/Welcome";
import gameSoundState from "../recoil/atoms/gameSoundState";
import playerState from "../recoil/atoms/playerState";
import { Routes } from "../routes/CONSTANTS";

const MultiPlayerPage = () => {
  const { t } = useTranslation();
  const { playPopUpOnSound, playGlugSound } = useRecoilValue(gameSoundState);

  const showInDevelopment = () => {
    playGlugSound && playGlugSound();
    alert(t("In development"));
  };

  return (
    <div className="chat-board">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pika pika! - Multi player</title>
      </Helmet>
      <div className="game-board">
        <ChatRoom room="general" />
      </div>
      <div className="sidebar">
        <div className="game-info">
          <h1 className="game-title">{t("Multi player")}</h1>
          <Welcome />
        </div>
        <div>
          <div className="text-center">
            <p className="text-coming-soon">{t("Coming soon...")}</p>
            <button onClick={showInDevelopment}>{t("Make match")}</button>
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
