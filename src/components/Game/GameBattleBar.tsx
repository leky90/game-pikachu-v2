import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import gameBattlePointsState from "../../recoil/atoms/gameBattlePointsState";
import { useGameBattleActions } from "../../hooks/useGameBattleActions";
import { useEffect } from "react";
import gameBattleState from "../../recoil/atoms/gameBattleState";
import playerState from "../../recoil/atoms/playerState";
import gameState from "../../recoil/atoms/gameState";
import { GameStatus } from "../../types/game";

const GameBattleBar = () => {
  const { t } = useTranslation();
  const { endGame } = useGameBattleActions();
  const { yourPoint, competitorPoint } = useRecoilValue(gameBattlePointsState);
  const { competitor } = useRecoilValue(gameBattleState);
  const { status } = useRecoilValue(gameState);
  const { player } = useRecoilValue(playerState);
  const yourWidth = 50 + yourPoint - competitorPoint;

  // useEffect(() => {
  //   if (yourWidth >= 100) {
  //     endGame(player);
  //   } else if (yourWidth <= 0) {
  //     endGame(competitor ?? player);
  //   }
  // }, [yourWidth]);

  if (status === GameStatus.RUNNING) {
    if (yourWidth >= 100) {
      endGame(player);
    } else if (yourWidth <= 0) {
      endGame(competitor ?? player);
    }
  }

  return (
    <div className="battle-bar animated-red-gradient">
      <div
        className="your-bar animated-blue-gradient"
        style={{ width: yourWidth + "%" }}
      >
        <span className="point">
          {t("Your points")} {yourPoint ?? 0}
        </span>
      </div>
      <span className="point">
        {competitorPoint ?? 0} {t("Competitor points")}
      </span>
    </div>
  );
};

export default GameBattleBar;
