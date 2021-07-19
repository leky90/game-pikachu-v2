import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Routes } from "../routes/CONSTANTS";
import GameSpeedBoard from "../components/GameSpeedBoard";
import GameOverlay from "../components/GameOverlay";
import { useRecoilValue } from "recoil";
import gameSoundState from "../recoil/atoms/gameSoundState";

const SpeedModePage = () => {
  const { t } = useTranslation();
  const { playDisableSound } = useRecoilValue(gameSoundState);

  return (
    <div className="game-container">
      <div className="game-board">
        <GameOverlay />
        <GameSpeedBoard />
      </div>
      <div className="sidebar">
        <div className="game-info">
          <h1 className="game-title">{t("Speed mode")}</h1>
        </div>
        <Link to={Routes.SINGLE_PLAYER_PAGE}>
          <button onClick={() => playDisableSound()}>{t("Back")}</button>
        </Link>
      </div>
    </div>
  );
};

export default SpeedModePage;
