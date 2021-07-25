import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Routes } from "../../routes/CONSTANTS";

interface ActiveGame {
  gameId: string;
}

const ActiveGame: FC<ActiveGame> = ({ gameId }) => {
  const { t } = useTranslation();
  return (
    <li className="active-player">
      <Link to={Routes.BATTLE_MODE_PAGE.replace(":gameId", gameId)}>
        <button className="button-join-game">
          <span className="hidden-mobile">{t("Click to join")}:</span> {gameId}
        </button>
      </Link>
    </li>
  );
};

function areSameProps(prevProps: ActiveGame, nextProps: ActiveGame) {
  return prevProps.gameId === nextProps.gameId;
}

export default memo(ActiveGame, areSameProps);
