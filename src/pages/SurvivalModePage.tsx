import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Routes } from "../routes/CONSTANTS";
import GameBoard from "../components/GameBoard";
import GameOverlay from "../components/GameOverlay";
import { useRecoilValue } from "recoil";
import gameSoundState from "../recoil/atoms/gameSoundState";
import gameState from "../recoil/atoms/gameState";
import SwitchLanguage from "../components/SwitchLanguage";
import GameSurvivalInfo from "../components/Game/GameSurvivalInfo";
import { GameMode } from "../types/game";
import { Helmet } from "react-helmet";

const SurvivalModePage = () => {
  const { t } = useTranslation();
  const { status } = useRecoilValue(gameState);
  const { playPopUpOnSound } = useRecoilValue(gameSoundState);

  return (
    <div className="game-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pika pika! - Survival mode board</title>
      </Helmet>
      <div className={`game-board game-${status}`}>
        <GameSurvivalInfo />
        <GameOverlay mode={GameMode.SURVIVAL_MODE} />
        <GameBoard mode={GameMode.SURVIVAL_MODE} />
      </div>
      <div className="sidebar">
        <GameSurvivalInfo hasTiming />
        <div>
          <blockquote className="game-helper">
            {t("Try your best not to run out of time as long as possible")}
          </blockquote>
          <blockquote className="game-helper">
            {t("Your time will increase when you match a pair of pokemon")}
          </blockquote>
          <blockquote className="game-helper">
            {t("Choosing the wrong pair will decrease the time")}
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

export default SurvivalModePage;
