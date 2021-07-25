import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import gameState from "../../recoil/atoms/gameState";
import {
  BONUS_POINTS,
  FREEZING_TIME,
  GameStatus,
  LEVEL_UP_POINTS,
  PENALTY_POINTS,
  PENDING_TIME,
} from "../../types/game";
import { useGameBattleActions } from "../../hooks/useGameBattleActions";
import { getPlayerID, getPlayerName } from "../../utils/game";
import { useTranslation } from "react-i18next";
import gameBattleState from "../../recoil/atoms/gameBattleState";

const GamePendingTiming = () => {
  const { t } = useTranslation();
  const { status } = useRecoilValue(gameState);
  const { allReady, winner } = useRecoilValue(gameBattleState);
  const { startGame } = useGameBattleActions();
  const pendingTiming = useRef(PENDING_TIME);
  const [timingState, setTimingState] = useState(0);
  const player = winner ? winner : allReady.length > 0 && allReady[0];
  let winnerPlayerName = "";
  if (player) {
    winnerPlayerName = `${getPlayerName(player)} - ${getPlayerID(player)}`;
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;

    switch (status) {
      case GameStatus.READY:
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
        break;

      default:
        pendingTiming.current = PENDING_TIME;
        break;
    }

    return () => {
      pendingTiming.current = PENDING_TIME;
      intervalId && clearInterval(intervalId);
    };
  }, [status]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined;

    switch (status) {
      case GameStatus.READY:
        timeoutId = setTimeout(() => {
          setTimingState(timingState + 1);
        }, 1000);
        break;

      default:
        timeoutId && clearTimeout(timeoutId);
        break;
    }
    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [timingState, status]);

  return (
    <div className="game-info">
      {status === GameStatus.COMPLETED && (
        <div className="battle-result">
          <h2 className="game-title">{t("The winner")}</h2>
          <h1 className="text-big-title">{winnerPlayerName}</h1>
        </div>
      )}
      {status === GameStatus.PENDING && (
        <div className="battle-rule">
          <h1 className="game-title">{t("Battle rule")}</h1>
          <blockquote>
            {t("Matched pair of pokemon, your points will be increased", {
              point: BONUS_POINTS,
            })}
          </blockquote>
          <blockquote>
            {t(
              "Matched the wrong pair of pokemon, your points will be decreased",
              { point: PENALTY_POINTS }
            )}
          </blockquote>
          <blockquote>
            {t(
              "If your points are over competitor points 50 points. You are the winner and vice versa."
            )}
          </blockquote>
          <blockquote>
            {t(
              "Every time you level up, you will deal 1 of 2 effects `Freeze enemy` or `Give points to yourself`",
              { second: FREEZING_TIME, point: LEVEL_UP_POINTS }
            )}
          </blockquote>
        </div>
      )}
      {status === GameStatus.READY && (
        <div
          key="count-down"
          id="count-down-pending-timing"
          className="overlay-pending-timing"
        >
          {pendingTiming.current}
        </div>
      )}
    </div>
  );
};

export default GamePendingTiming;
