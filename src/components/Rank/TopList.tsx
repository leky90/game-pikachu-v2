import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getTopRanking,
  TopPlayer,
  TopPlayersResponse,
} from "../../api/ranking";
import useAsync, { Response, ResponseStatus } from "../../hooks/useAsync";
import { Routes } from "../../routes/CONSTANTS";
import { dateTimeFromTimestamp, timeConvert } from "../../utils/time";
import { useRecoilValue } from "recoil";
import gameSoundState from "../../recoil/atoms/gameSoundState";
import { useTranslation } from "react-i18next";
import { GameMode } from "../../types/game";

type TopListProps = {
  fetch: () => Promise<TopPlayersResponse>;
  mode: GameMode;
};

const TopList: FC<TopListProps> = ({ fetch, mode }) => {
  const { t } = useTranslation();
  const { playPopUpOnSound } = useRecoilValue(gameSoundState);
  const { status, value: topPlayersResponse, error } = useAsync(fetch, true);

  return (
    <>
      {topPlayersResponse &&
        topPlayersResponse.data === null &&
        (mode === GameMode.SPEED_MODE ? (
          <Link to={Routes.SPEED_MODE_PAGE}>
            <button onClick={() => playPopUpOnSound()}>
              {t("Speed mode")}
            </button>
          </Link>
        ) : (
          <Link to={Routes.SURVIVAL_MODE_PAGE}>
            <button onClick={() => playPopUpOnSound()}>
              {t("Survival mode")}
            </button>
          </Link>
        ))}
      <ol className="rank-list">
        {status === ResponseStatus.SUCCESS &&
          topPlayersResponse?.data?.map((player: TopPlayer) => (
            <li key={`id-${player.timestamp}-${player.playerName}`}>
              {player.playerName} - {timeConvert(player.timing)} -{" "}
              {dateTimeFromTimestamp(player.timestamp)}
            </li>
          ))}
        {status === ResponseStatus.ERROR && error && (
          <p className="has-error">{error}</p>
        )}
      </ol>
    </>
  );
};

export default TopList;
