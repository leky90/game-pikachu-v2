import { FC } from "react";
import { useTranslation } from "react-i18next";
import { GameStatus } from "../../types/game";
import GameBattleBoard from "../GameBattleBoard";
import GameOverlay from "../GameOverlay";
import GameBattleSocket from "./GameBattleSocket";
import GamePendingTiming from "./GamePendingTiming";

interface GameBoardContainerProps {
  gameId: string;
  status: GameStatus;
  player: string;
}

const GameBoardContainer: FC<GameBoardContainerProps> = ({
  gameId,
  status,
  player,
}) => {
  const { t } = useTranslation();
  return (
    <div className={`game-board game-${status}`}>
      <h1 className="game-id">
        {t("Game ID")}: {gameId}
      </h1>
      <GameBattleSocket gameId={gameId} player={player} />
      <GameOverlay />
      <GameBattleBoard />
      <GamePendingTiming />
    </div>
  );
};

export default GameBoardContainer;
