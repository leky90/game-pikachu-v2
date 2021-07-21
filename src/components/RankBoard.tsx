import { memo } from "react";
import { useTranslation } from "react-i18next";
import { getTopRanking } from "../api/ranking";
import { GameMode } from "../types/game";
import TopList from "./Rank/TopList";

const RankBoard = () => {
  const { t } = useTranslation();

  return (
    <div className="max-screen-container rank-board">
      <h1>{t("Top players")}</h1>
      <div className="row">
        <div className="col">
          <h4>
            <em>{t("The longest is best")}</em>
          </h4>
          <TopList
            fetch={() => getTopRanking(GameMode.SURVIVAL_MODE)}
            mode={GameMode.SURVIVAL_MODE}
          />
        </div>
        <div className="col">
          <h4>
            <em>{t("The fastest is best")}</em>
          </h4>
          <TopList
            fetch={() => getTopRanking(GameMode.SPEED_MODE)}
            mode={GameMode.SPEED_MODE}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(RankBoard, () => true);
