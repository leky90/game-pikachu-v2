import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import gameState from "../../recoil/atoms/gameState";
import playerState from "../../recoil/atoms/playerState";
import {
  GameMode,
  GameStatus,
  PENALTY_TIME,
  PENDING_TIME,
  SUGGEST_TIME,
} from "../../types/game";
import { timeConvert } from "../../utils/time";
import gameOverlayState from "../../recoil/atoms/gameOverlayState";
import gameSoundState from "../../recoil/atoms/gameSoundState";
import { useGameActions } from "../../hooks/useGameActions";
import { hasAnyConnectLine } from "../../utils/game";

const GameTiming: FC<{ hasTiming: boolean }> = ({ hasTiming = false }) => {
  const { t } = useTranslation();
  const { status, pokemons, matrix, row, col } = useRecoilValue(gameState);
  const { playRisingPopSound, playGlugSound } = useRecoilValue(gameSoundState);
  const [currentPlayer, setPlayer] = useRecoilState(playerState);
  const [{ connectingLinePoints }, setGameOverlay] =
    useRecoilState(gameOverlayState);
  const [timingState, setTimingState] = useState(0);
  const timing = useRef(0);
  const suggestTiming = useRef(0);
  const pendingTiming = useRef(PENDING_TIME);
  const { startGame } = useGameActions(GameMode.SPEED_MODE);

  // count timing when running, stop when completed
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined;

    if (status === GameStatus.PENDING && hasTiming) {
      timing.current = 0;
    }

    if (status === GameStatus.RUNNING) {
      if (hasTiming) {
        if (suggestTiming.current >= SUGGEST_TIME) {
          const { foundConnectLine, fromPoint, toPoint } = hasAnyConnectLine(
            pokemons,
            matrix,
            row,
            col
          );
          if (foundConnectLine) {
            setGameOverlay((gameOverlay) => ({
              ...gameOverlay,
              suggestPoints: [fromPoint, toPoint],
            }));
          }
          suggestTiming.current = 0;
        }
      }
      timeoutId = setTimeout(() => {
        timing.current++;
        suggestTiming.current++;
        setTimingState(timingState + 1);
      }, 1000);
    }

    // update timing to make score
    if (status === GameStatus.COMPLETED) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }

    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [status, timingState]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;
    if (status === GameStatus.PENDING) {
      if (hasTiming) {
        setGameOverlay((gameOverlay) => ({
          ...gameOverlay,
          suggestPoints: [undefined, undefined],
        }));
      }

      timing.current = 0;
      pendingTiming.current = PENDING_TIME;
      const countdownEl = document.getElementById("count-down-pending-timing");
      if (countdownEl) countdownEl.innerText = pendingTiming.current.toString();
      intervalId = setInterval(() => {
        if (pendingTiming.current <= 1) {
          intervalId && clearInterval(intervalId);
          pendingTiming.current = PENDING_TIME;
          startGame();
        } else {
          pendingTiming.current--;
        }
        const countdownEl = document.getElementById(
          "count-down-pending-timing"
        );
        if (countdownEl)
          countdownEl.innerText = pendingTiming.current.toString();
      }, 1000);
    }

    if (status === GameStatus.COMPLETED) {
      intervalId && clearInterval(intervalId);
      if (hasTiming) {
        suggestTiming.current = 0;
        setPlayer({ ...currentPlayer, playerTiming: timing.current });
      }
    }
    return () => {
      suggestTiming.current = 0;
      pendingTiming.current = PENDING_TIME;
      intervalId && clearInterval(intervalId);
    };
  }, [status]);

  // check rule time
  useEffect(() => {
    if (connectingLinePoints.length === 1) {
      playGlugSound && playGlugSound();
      timing.current += PENALTY_TIME;
    }
    if (connectingLinePoints.length > 1) {
      suggestTiming.current = 0;
      playRisingPopSound && playRisingPopSound();
    }
  }, [connectingLinePoints]);

  return (
    <>
      {!hasTiming && (
        <div
          key="count-down"
          id="count-down-pending-timing"
          className="overlay-pending-timing"
        >
          {pendingTiming.current}
        </div>
      )}
      <p className="text-center">
        {t("Your time")}: {timeConvert(timing.current)}
      </p>
    </>
  );
};

export default GameTiming;
