import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Routes } from "../routes/CONSTANTS";
import GameBoard from "../components/GameBoard";
import GameOverlay from "../components/GameOverlay";
import { useRecoilValue } from "recoil";
import gameSoundState from "../recoil/atoms/gameSoundState";
import gameState from "../recoil/atoms/gameState";
import GameSpeedInfo from "../components/Game/GameSpeedInfo";
import SwitchLanguage from "../components/SwitchLanguage";
import { GameMode } from "../types/game";
import { Helmet } from "react-helmet";

const SpeedModePage = () => {
  const { t } = useTranslation();
  const { status } = useRecoilValue(gameState);
  const { playPopUpOnSound } = useRecoilValue(gameSoundState);

  return (
    <div className="game-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pika pika! - Speed mode board</title>
      </Helmet>
      <div className={`game-board game-${status}`}>
        <GameSpeedInfo />
        <GameOverlay mode={GameMode.SPEED_MODE} />
        <GameBoard mode={GameMode.SPEED_MODE} />
      </div>
      <div className="sidebar">
        <GameSpeedInfo hasTiming />
        <div>
          <blockquote className="game-helper">
            {t("Please complete all levels as fast as you can")}
          </blockquote>
          <blockquote className="game-helper">
            {t("Choosing the wrong pair will increase the time")}
          </blockquote>
        </div>
        <Link to={Routes.SINGLE_PLAYER_PAGE}>
          <button onClick={() => playPopUpOnSound && playPopUpOnSound()}>
            {t("Back")}
          </button>
        </Link>
        <p className="mobile-helper">{t("Scroll down to play")}</p>
        <SwitchLanguage />
      </div>
    </div>
  );
};

export default SpeedModePage;
