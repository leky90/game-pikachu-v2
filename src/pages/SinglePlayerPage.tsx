import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import RankBoard from "../components/RankBoard";
import { Routes } from "../routes/CONSTANTS";
import { useGameActions } from "../hooks/useGameActions";
import { useEffect } from "react";
import gameSoundState from "../recoil/atoms/gameSoundState";
import { useRecoilValue } from "recoil";
import SwitchLanguage from "../components/SwitchLanguage";
import { Helmet } from "react-helmet";
import { GameMode } from "../types/game";
import Welcome from "../components/Welcome";

const SinglePlayerPage = () => {
  const { t } = useTranslation();
  const { playPopUpOnSound } = useRecoilValue(gameSoundState);
  const { resetGame } = useGameActions(GameMode.SURVIVAL_MODE);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  return (
    <div className="game-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pika pika! - Single player</title>
      </Helmet>
      <div className="game-board">
        <RankBoard />
      </div>
      <div className="sidebar">
        <div className="game-info">
          <h1 className="game-title">{t("Single player")}</h1>
          <Welcome />
        </div>
        <div>
          <Link to={Routes.SURVIVAL_MODE_PAGE}>
            <button onClick={() => playPopUpOnSound && playPopUpOnSound()}>
              {t("Survival mode")}
            </button>
          </Link>
          <Link to={Routes.SPEED_MODE_PAGE}>
            <button onClick={() => playPopUpOnSound && playPopUpOnSound()}>
              {t("Speed mode")}
            </button>
          </Link>
          <Link to={Routes.MAIN_PAGE}>
            <button onClick={() => playPopUpOnSound && playPopUpOnSound()}>
              {t("Back")}
            </button>
          </Link>
        </div>
        <SwitchLanguage />
      </div>
    </div>
  );
};

export default SinglePlayerPage;
