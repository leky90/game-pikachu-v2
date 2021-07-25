import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ActivePlayersResponse, getActivePlayers } from "../../api/user";
import useAsync, { ResponseStatus } from "../../hooks/useAsync";
import { getPlayerID } from "../../utils/game";
import { preventReRender } from "../../utils/memo";
import ActivePlayer from "./ActivePlayer";

const ListActivePlayers = () => {
  const {
    status,
    value: activePlayersResponse,
    error,
    execute,
  } = useAsync<ActivePlayersResponse>(getActivePlayers, true);

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
      <h3>{t("Active players")}</h3>
      <ul>
        {status === ResponseStatus.SUCCESS &&
          activePlayersResponse?.data?.map(
            (activePlayer: string, index: number) => (
              <ActivePlayer
                player={activePlayer}
                key={getPlayerID(activePlayer)}
              />
            )
          )}
      </ul>
    </div>
  );
};

export default memo(ListActivePlayers, preventReRender);
