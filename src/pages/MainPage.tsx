import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Routes } from "../routes/CONSTANTS";
import { useRecoilValue } from "recoil";
import gameSoundState from "../recoil/atoms/gameSoundState";
import SwitchLanguage from "../components/SwitchLanguage";
import { Helmet } from "react-helmet";
import playerState from "../recoil/atoms/playerState";

const MainPage = () => {
  const { t } = useTranslation();
  const { playPopUpOnSound } = useRecoilValue(gameSoundState);
  const { playerName } = useRecoilValue(playerState);

  return (
    <div className="main-board">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pika pika! - Main board</title>
      </Helmet>
      <nav className="navigation">
        <h3 className="text-center">
          {t("Welcome")}, {playerName}
        </h3>
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
