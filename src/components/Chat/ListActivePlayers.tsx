import { memo, useEffect } from "react";
import { ActivePlayersResponse, getActivePlayers } from "../../api/user";
import useAsync, { ResponseStatus } from "../../hooks/useAsync";
import { preventReRender } from "../../utils/memo";
import ActivePlayer from "./ActivePlayer";

const ListActivePlayers = () => {
  const {
    status,
    value: activePlayersResponse,
    error,
    execute,
  } = useAsync<ActivePlayersResponse>(getActivePlayers, true);

  useEffect(() => {
    console.log("timeoutId");
    const timeoutId = setTimeout(() => {
      execute();
    }, 30000);

    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [status]);

  return (
    <ul className="active-players-box">
      {status === ResponseStatus.SUCCESS &&
        activePlayersResponse?.data?.map(
          (activePlayer: string, index: number) => (
            <ActivePlayer
              playerName={activePlayer}
              key={activePlayer.replace(/^.*-/g, "")}
            />
          )
        )}
    </ul>
  );
};

export default memo(ListActivePlayers, preventReRender);
