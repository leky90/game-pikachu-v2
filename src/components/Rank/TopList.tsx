import { FC } from "react";
import { TopPlayer } from "../../api/ranking";
import useAsync, { Response, ResponseStatus } from "../../hooks/useAsync";
import { dateTimeFromTimestamp, timeConvert } from "../../utils/time";

type TopListProps = {
  fetch: () => Promise<Response>;
};

const TopList: FC<TopListProps> = ({ fetch }) => {
  const { status, value: topPlayers, error } = useAsync(fetch, true);

  return (
    <ol className="rank-list">
      {status === ResponseStatus.SUCCESS &&
        topPlayers?.data?.map((player: TopPlayer) => (
          <li>
            {player.playerName} - {timeConvert(player.timing)} -{" "}
            {dateTimeFromTimestamp(player.timestamp)}
          </li>
        ))}
      {status === ResponseStatus.ERROR && error && (
        <p className="has-error">{error}</p>
      )}
    </ol>
  );
};

export default TopList;
