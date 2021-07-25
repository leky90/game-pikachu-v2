import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ActiveGamesResponse, getActiveGames } from "../../api/game";
import useAsync, { ResponseStatus } from "../../hooks/useAsync";
import { preventReRender } from "../../utils/memo";
import ActiveGame from "./ActiveGame";

const ListActiveGames = () => {
  const {
    status,
    value: activeGamesResponse,
    error,
    execute,
  } = useAsync<ActiveGamesResponse>(getActiveGames, true);

  const { t } = useTranslation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      execute();
    }, 10000);

    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [status]);

  return (
    <div className="active-players-box">
      <h3>{t("Active games")}</h3>
      <ul>
        {status === ResponseStatus.SUCCESS &&
          activeGamesResponse?.data?.map((gameId: string, index: number) => (
            <ActiveGame gameId={gameId} key={gameId} />
          ))}
      </ul>
    </div>
  );
};

export default memo(ListActiveGames, preventReRender);
