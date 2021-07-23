import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Routes } from "../routes/CONSTANTS";
import { useRecoilValue } from "recoil";
import gameSoundState from "../recoil/atoms/gameSoundState";
import SwitchLanguage from "../components/SwitchLanguage";
import { Helmet } from "react-helmet";
import playerState from "../recoil/atoms/playerState";
import Welcome from "../components/Welcome";

const MainPage = () => {
  const { t } = useTranslation();
  const { playPopUpOnSound } = useRecoilValue(gameSoundState);

  return (
    <div className="main-board">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pika pika! - Main board</title>
      </Helmet>
      <nav className="navigation">
        <Welcome />
        <Link to={Routes.SINGLE_PLAYER_PAGE}>
          <button onClick={() => playPopUpOnSound && playPopUpOnSound()}>
            {t("Single player")}
          </button>
        </Link>
        <Link to={Routes.MULTI_PLAYER_PAGE}>
          <button onClick={() => playPopUpOnSound && playPopUpOnSound()}>
            {t("Multi player")}
          </button>
        </Link>
        <SwitchLanguage />
      </nav>
    </div>
  );
};

export default MainPage;
