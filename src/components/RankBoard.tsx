import { useTranslation } from "react-i18next";

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
          <ol className="rank-list">
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
          </ol>
        </div>
        <div className="col">
          <h4>
            <em>{t("The fastest is best")}</em>
          </h4>
          <ol className="rank-list">
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
            <li>Player</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RankBoard;
