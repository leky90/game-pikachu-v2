import { FC } from "react";

import { GameMode } from "../../types/game";
import { useGameActions } from "../../hooks/useGameActions";
import GameLevel from "./GameLevel";
import GameTiming from "./GameTiming";
import GameTitle from "./GameTitle";
import GameReplay from "./GameReplay";
import { useTranslation } from "react-i18next";

const GameSpeedInfo: FC<{ hasTiming?: boolean }> = ({ hasTiming = false }) => {
  const { t } = useTranslation();
  const { replayGame } = useGameActions(GameMode.SPEED_MODE);

  return (
    <div className="game-info">
      <GameTitle title={t("Speed mode")} />
      <GameLevel />
      <GameTiming hasTiming={hasTiming} />
      <GameReplay action={replayGame} />
    </div>
  );
};

export default GameSpeedInfo;
