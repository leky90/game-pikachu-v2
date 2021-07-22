import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";

import gameState from "../../recoil/atoms/gameState";
import gameTimingState from "../../recoil/atoms/gameTimingState";
import suggestTimingState from "../../recoil/atoms/suggestTimingState";
import playerState from "../../recoil/atoms/playerState";
import { GameMode, GameStatus } from "../../types/game";
import { timeConvert } from "../../utils/time";
import { useGameActions } from "../../hooks/useGameActions";
import { hasAnyConnectLine } from "../../utils/game";

const GameSpeedInfo = () => {
  const { t } = useTranslation();
  const { level, status } = useRecoilValue(gameState);
  const [gameTiming, setGameTiming] = useRecoilState(gameTimingState);
  const [suggestTiming, setSuggestTiming] = useRecoilState(suggestTimingState);
  const [currentPlayer, setPlayer] = useRecoilState(playerState);
  const { timing } = gameTiming;
  const { replayGame } = useGameActions(GameMode.SPEED_MODE);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined;

    if (status === GameStatus.RUNNING) {
      if (suggestTiming >= 15) {
        setSuggestTiming(0);
      }

      timeoutId = setTimeout(() => {
        setGameTiming({
          timing: timing + 1,
        });
        setSuggestTiming(suggestTiming + 1);
      }, 1000);
    }
    if (status === GameStatus.COMPLETED) {
      if (timeoutId) clearTimeout(timeoutId);
      setPlayer({ ...currentPlayer, playerTiming: timing });
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timing, status]);

  return (
    <div className="game-info">
      <h1 className="game-title">
        {status === GameStatus.COMPLETED
          ? t("Congratulations") + " " + currentPlayer.playerName
          : t("Speed mode")}
      </h1>
      <h3 className="game-title">
        {t("Level")} {level} / 14
      </h3>
      <p className="text-center">
        {t("Your time")}: {timeConvert(timing)}
      </p>
      <p>
        <button onClick={() => replayGame(currentPlayer.playerName)}>
          {t("Replay")}
        </button>
      </p>
    </div>
  );
};

export default GameSpeedInfo;
