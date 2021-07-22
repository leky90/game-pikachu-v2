import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import { useGameActions } from "../../hooks/useGameActions";
import gameOverlayState from "../../recoil/atoms/gameOverlayState";
import gameSoundState from "../../recoil/atoms/gameSoundState";
import gameState from "../../recoil/atoms/gameState";
import playerState from "../../recoil/atoms/playerState";
import {
  BASE_START_TIME,
  BONUS_TIME,
  GameMode,
  GameStatus,
  PENALTY_TIME,
} from "../../types/game";
import { timeConvert } from "../../utils/time";

const GameSurvivalTiming: FC<{ hasTiming: boolean }> = ({
  hasTiming = false,
}) => {
  const { t } = useTranslation();
  const { status } = useRecoilValue(gameState);
  const { playRisingPopSound, playGlugSound } = useRecoilValue(gameSoundState);
  const [timingState, setTimingState] = useState(0);
  const timing = useRef(0);
  const remainTiming = useRef(BASE_START_TIME);
  const [currentPlayer, setPlayer] = useRecoilState(playerState);
  const { endGame, startGame } = useGameActions(GameMode.SURVIVAL_MODE);
  const { connectingLinePoints } = useRecoilValue(gameOverlayState);

  // count timing when running, stop when completed
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined;

    if (status === GameStatus.PENDING && hasTiming) {
      timing.current = 0;
      remainTiming.current = BASE_START_TIME;
      setTimeout(() => {
        startGame();
      }, 3000);
    }

    if (status === GameStatus.RUNNING) {
      if (remainTiming.current <= 0) {
        if (hasTiming) {
          endGame();
        }
      } else {
        timeoutId = setTimeout(() => {
          timing.current++;
          remainTiming.current--;
          setTimingState(timingState + 1);
        }, 1000);
      }
    }

    // update timing to make score
    if (status === GameStatus.COMPLETED) {
      if (timeoutId) clearTimeout(timeoutId);
      if (hasTiming) {
        setPlayer({ ...currentPlayer, playerTiming: timing.current });
      }
    }
  }, [status, timingState]);

  // check rule time
  useEffect(() => {
    if (connectingLinePoints.length === 1) {
      playGlugSound && playGlugSound();
      remainTiming.current -= PENALTY_TIME;
    }
    if (connectingLinePoints.length > 1) {
      playRisingPopSound && playRisingPopSound();
      remainTiming.current += BONUS_TIME;
    }
  }, [connectingLinePoints]);

  return (
    <>
      <p className="text-center">
        {t("Your time")}: {timeConvert(timing.current)}
      </p>
      <p className="text-center">
        {t("Remaining time")}: {timeConvert(remainTiming.current)}
      </p>
    </>
  );
};

export default GameSurvivalTiming;
