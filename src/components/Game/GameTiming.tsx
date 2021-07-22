import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import gameState from "../../recoil/atoms/gameState";
import playerState from "../../recoil/atoms/playerState";
import { GameMode, GameStatus, PENALTY_TIME } from "../../types/game";
import { timeConvert } from "../../utils/time";
import gameOverlayState from "../../recoil/atoms/gameOverlayState";
import gameSoundState from "../../recoil/atoms/gameSoundState";
import { useGameActions } from "../../hooks/useGameActions";

const GameTiming: FC<{ hasTiming: boolean }> = ({ hasTiming = false }) => {
  const { t } = useTranslation();
  const { status } = useRecoilValue(gameState);
  const { playRisingPopSound, playGlugSound } = useRecoilValue(gameSoundState);
  const [currentPlayer, setPlayer] = useRecoilState(playerState);
  const { connectingLinePoints } = useRecoilValue(gameOverlayState);
  const [timingState, setTimingState] = useState(0);
  const timing = useRef(0);
  const { startGame } = useGameActions(GameMode.SPEED_MODE);

  // count timing when running, stop when completed
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined;

    if (status === GameStatus.RUNNING) {
      timeoutId = setTimeout(() => {
        timing.current++;
        setTimingState(timingState + 1);
      }, 1000);
    }

    // update timing to make score
    if (status === GameStatus.COMPLETED) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  }, [status, timingState]);

  useEffect(() => {
    if (status === GameStatus.PENDING && hasTiming) {
      timing.current = 0;
      setTimeout(() => {
        startGame();
      }, 3000);
    }

    if (status === GameStatus.COMPLETED) {
      setPlayer({ ...currentPlayer, playerTiming: timing.current });
    }
  }, [status]);

  // check rule time
  useEffect(() => {
    if (connectingLinePoints.length === 1) {
      playGlugSound && playGlugSound();
      timing.current += PENALTY_TIME;
    }
    if (connectingLinePoints.length > 1) {
      playRisingPopSound && playRisingPopSound();
    }
  }, [connectingLinePoints]);

  return (
    <p className="text-center">
      {t("Your time")}: {timeConvert(timing.current)}
    </p>
  );
};

export default GameTiming;
