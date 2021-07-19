import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import useGameEngine from "../../hooks/useGameEngine";
import gameState from "../../recoil/atoms/gameState";
import gameTimingState from "../../recoil/atoms/gameTimingState";
import { GameMode, GameStatus } from "../../types/game";
import { timeConvert } from "../../utils/time";

const GameSpeedInfo = () => {
  const { t } = useTranslation();
  const { level, status } = useRecoilValue(gameState);
  const [gameTiming, setGameTiming] = useRecoilState(gameTimingState);
  const { timing } = gameTiming;
  const { replayGame } = useGameEngine(GameMode.SPEED_MODE);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined;

    if (status === GameStatus.RUNNING) {
      timeoutId = setTimeout(() => {
        setGameTiming({
          timing: timing + 1,
        });
      }, 1000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timing, status]);

  return (
    <div className="game-info">
      <h1 className="game-title">
        {status === GameStatus.COMPLETED
          ? t("Congratulations!")
          : t("Speed mode")}
      </h1>
      <h3 className="game-title">
        {t("Level")} {level} / 14
      </h3>
      <p className="text-center">
        {t("Your time")}: {timeConvert(timing)}
      </p>
      <p>
        <button onClick={replayGame}>{t("Replay")}</button>
      </p>
    </div>
  );
};

export default GameSpeedInfo;
