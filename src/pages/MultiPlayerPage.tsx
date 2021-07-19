import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import gameSoundState from "../recoil/atoms/gameSoundState";
import { Routes } from "../routes/CONSTANTS";

const MultiPlayerPage = () => {
  const { t } = useTranslation();

  const { playPopUpOnSound } = useRecoilValue(gameSoundState);

  return (
    <div className="main-board">
      <div className="text-center">
        <p className="text-coming-soon">{t("Coming soon...")}</p>
        <Link to={Routes.MAIN_PAGE}>
          <button onClick={() => playPopUpOnSound()}>{t("Main menu")}</button>
        </Link>
      </div>
    </div>
  );
};

export default MultiPlayerPage;
