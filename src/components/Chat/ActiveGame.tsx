import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getPlayersInGame } from "../../api/game";
import useAsync, { ResponseStatus } from "../../hooks/useAsync";
import { Routes } from "../../routes/CONSTANTS";

interface ActiveGame {
  gameId: string;
}

const ActiveGame: FC<ActiveGame> = ({ gameId }) => {
  const { t } = useTranslation();
  const fetchPlayersInGame = useCallback(
    () => getPlayersInGame(gameId),
    [gameId]
  );
  const { status: fetchStatus, value: playersInGameResponse } =
    useAsync(fetchPlayersInGame);

  const fullGameClass =
    playersInGameResponse?.data?.length >= 2 ? "full-slot" : "";
  return (
    <>
      {fetchStatus === ResponseStatus.SUCCESS && (
        <li className={`active-player ${fullGameClass}`}>
          <Link to={Routes.BATTLE_MODE_PAGE.replace(":gameId", gameId)}>
            <button className="button-join-game">
              <span className="hidden-mobile">{t("Join")}:</span>
              {gameId}
            </button>
          </Link>
        </li>
      )}
    </>
  );
};

function areSameProps(prevProps: ActiveGame, nextProps: ActiveGame) {
  return prevProps.gameId === nextProps.gameId;
}

export default ActiveGame;
