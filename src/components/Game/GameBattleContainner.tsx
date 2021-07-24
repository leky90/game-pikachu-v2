import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import gameBattleState from "../../recoil/atoms/gameBattleState";
import gameState from "../../recoil/atoms/gameState";
import playerState from "../../recoil/atoms/playerState";
import { Routes } from "../../routes/CONSTANTS";
import CompetitorReadyGameButton from "./CompetitorReadyGameButton";
import GameBoardContainer from "./GameBoardContainer";
import ReadyGameButton from "./ReadyGameButton";

interface GameBattleContainerProps {
  gameId: string;
  player: string;
}

const GameBattleContainer: FC<GameBattleContainerProps> = ({
  gameId,
  player,
}) => {
  const { t } = useTranslation();
  const { status } = useRecoilValue(gameState);
  const { sendQuitGame, yourPoint, competitorPoint } =
    useRecoilValue(gameBattleState);
  return (
    <>
      <div className="battle-container-bar">
        <div id="current-player-name" className="player-box">
          <ReadyGameButton status={status} player={player} />
          <Link to={Routes.MULTI_PLAYER_PAGE} onClick={sendQuitGame}>
            <button className={`button-quit`}>{t("Quit")}</button>
          </Link>
        </div>
        <div className="battle-bar animated-red-gradient">
          <div className="your-bar animated-blue-gradient">
            <span className="point">
              {t("Your points")} {yourPoint ?? 0}
            </span>
          </div>
          <span className="point">
            {competitorPoint ?? 0} {t("Competitor points")}
          </span>
        </div>
        <div id="competitor-player-name" className=" player-box">
          <CompetitorReadyGameButton status={status} player={player} />
        </div>
      </div>
      {gameId && (
        <GameBoardContainer gameId={gameId} status={status} player={player} />
      )}
    </>
  );
};

export default GameBattleContainer;
