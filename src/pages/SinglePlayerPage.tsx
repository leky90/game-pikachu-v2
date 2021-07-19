import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import RankBoard from "../components/RankBoard";
import { Routes } from "../routes/CONSTANTS";
import { useGameSpeedActions } from "../hooks/useGameSpeedActions";
import { useEffect } from "react";
import gameSoundState from "../recoil/atoms/gameSoundState";
import { useRecoilValue } from "recoil";

const SinglePlayerPage = () => {
  const { t } = useTranslation();
  const { playOpenMenuSound, playDisableSound } =
    useRecoilValue(gameSoundState);
  const { resetGame } = useGameSpeedActions();

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  return (
    <div className="game-container">
      <div className="game-board">
        <RankBoard />
      </div>
      <div className="sidebar">
        <div className="game-info">
          <h1 className="game-title">{t("Single mode")}</h1>
        </div>
        <Link to={Routes.SURVIVAL_MODE_PAGE}>
          <button onClick={() => playOpenMenuSound()}>
            {t("Survival mode")}
          </button>
        </Link>
        <Link to={Routes.SPEED_MODE_PAGE}>
          <button onClick={() => playOpenMenuSound()}>{t("Speed mode")}</button>
        </Link>
        <Link to={Routes.MAIN_PAGE}>
          <button onClick={() => playDisableSound()}>{t("Back")}</button>
        </Link>
      </div>
    </div>
  );
};

export default SinglePlayerPage;
