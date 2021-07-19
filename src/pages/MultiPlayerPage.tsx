import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import gameSoundState from "../recoil/atoms/gameSoundState";
import { Routes } from "../routes/CONSTANTS";

const MultiPlayerPage = () => {
  const { t } = useTranslation();

  const { playDisableSound } = useRecoilValue(gameSoundState);

  return (
    <div className="main-board">
      <div className="text-center">
        <p className="text-coming-soon">{t("Comming soon...")}</p>
        <Link to={Routes.MAIN_PAGE}>
          <button onClick={() => playDisableSound()}>{t("Main menu")}</button>
        </Link>
      </div>
    </div>
  );
};

export default MultiPlayerPage;
