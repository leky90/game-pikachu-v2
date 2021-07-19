import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Routes } from "../routes/CONSTANTS";
import { useRecoilValue } from "recoil";
import gameSoundState from "../recoil/atoms/gameSoundState";

const MainPage = () => {
  const { t } = useTranslation();

  const { playOpenMenuSound } = useRecoilValue(gameSoundState);

  return (
    <div className="main-board">
      <nav className="navigation">
        <Link to={Routes.SINGLE_PLAYER_PAGE}>
          <button onClick={() => playOpenMenuSound()}>
            {t("Single player")}
          </button>
        </Link>
        <Link to={Routes.MULTI_PLAYER_PAGE}>
          <button onClick={() => playOpenMenuSound()}>
            {t("Multi player")}
          </button>
        </Link>
      </nav>
    </div>
  );
};

export default MainPage;
