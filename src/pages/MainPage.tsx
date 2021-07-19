import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Routes } from "../routes/CONSTANTS";
import { useRecoilValue } from "recoil";
import gameSoundState from "../recoil/atoms/gameSoundState";
import SwitchLanguage from "../components/SwitchLanguage";

const MainPage = () => {
  const { t } = useTranslation();

  const { playPopUpOnSound } = useRecoilValue(gameSoundState);

  return (
    <div className="main-board">
      <nav className="navigation">
        <Link to={Routes.SINGLE_PLAYER_PAGE}>
          <button onClick={() => playPopUpOnSound()}>
            {t("Single player")}
          </button>
        </Link>
        <Link to={Routes.MULTI_PLAYER_PAGE}>
          <button onClick={() => playPopUpOnSound()}>
            {t("Multi player")}
          </button>
        </Link>
        <SwitchLanguage />
      </nav>
    </div>
  );
};

export default MainPage;
