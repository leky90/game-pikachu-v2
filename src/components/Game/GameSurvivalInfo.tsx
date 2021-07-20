import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import { useGameActions } from "../../hooks/useGameActions";
import gameState from "../../recoil/atoms/gameState";
import gameTimingState from "../../recoil/atoms/gameTimingState";
import playerState from "../../recoil/atoms/playerState";
import { GameMode, GameStatus } from "../../types/game";
import { timeConvert } from "../../utils/time";

const GameSurvivalInfo = () => {
  const { t } = useTranslation();
  const { level, status } = useRecoilValue(gameState);
  const [gameTiming, setGameTiming] = useRecoilState(gameTimingState);
  const { timing, yourTiming = 0 } = gameTiming;
  const [currentPlayer, setPlayer] = useRecoilState(playerState);
  const { replayGame, endGame } = useGameActions(GameMode.SURVIVAL_MODE);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined;

    if (status === GameStatus.RUNNING) {
      if (timing <= 0) {
        if (timeoutId) clearTimeout(timeoutId);
        endGame();
      } else {
        timeoutId = setTimeout(() => {
          setGameTiming({
            yourTiming: yourTiming + 1,
            timing: timing - 1,
          });
        }, 1000);
      }
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timing, status]);

  useEffect(() => {
    if (status === GameStatus.COMPLETED) {
      setPlayer({ ...currentPlayer, playerTiming: yourTiming });
    }
  }, [status]);

  return (
    <div className="game-info">
      <h1 className="game-title">
        {status === GameStatus.COMPLETED
          ? t("Congratulations") + " " + currentPlayer.playerName
          : t("Survival mode")}
      </h1>
      <h3 className="game-title">
        {t("Level")} {level} / 14
      </h3>
      <p className="text-center">
        {t("Your time")}: {yourTiming && timeConvert(yourTiming)}
      </p>
      <p className="text-center">
        {t("Remaining time")}: {timeConvert(timing)}
      </p>
      <p>
        <button onClick={replayGame}>{t("Replay")}</button>
      </p>
    </div>
  );
};

export default GameSurvivalInfo;
