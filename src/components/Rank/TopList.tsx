import { FC } from "react";
import { Link } from "react-router-dom";
import { TopPlayer, TopPlayersResponse } from "../../api/ranking";
import useAsync, { ResponseStatus } from "../../hooks/useAsync";
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
            <button
              onClick={() => playPopUpOnSound && playPopUpOnSound()}
              style={{ width: "calc(100% - 32px)", margin: 16 }}
            >
              {t("Make your own ranking")}
            </button>
          </Link>
        ) : (
          <Link to={Routes.SURVIVAL_MODE_PAGE}>
            <button
              onClick={() => playPopUpOnSound && playPopUpOnSound()}
              style={{ width: "calc(100% - 32px)", margin: 16 }}
            >
              {t("Make your own ranking")}
            </button>
          </Link>
        ))}
      <ol className="rank-list">
        {status === ResponseStatus.SUCCESS && topPlayersResponse?.data ? (
          topPlayersResponse?.data?.map(
            (player: TopPlayer, index: number) =>
              player.timing && (
                <li key={`id-${index}`}>
                  {player.playerName} - {timeConvert(player.timing)} -{" "}
                  {dateTimeFromTimestamp(player.timestamp)}
                </li>
              )
          )
        ) : (
          <li>{t("Service is under maintenance")}</li>
        )}
        {status === ResponseStatus.ERROR && error && (
          <p className="has-error">{error}</p>
        )}
      </ol>
    </>
  );
};

export default TopList;
