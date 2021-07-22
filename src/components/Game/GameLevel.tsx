import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import gameState from "../../recoil/atoms/gameState";

const GameLevel = () => {
  const { t } = useTranslation();
  const { level } = useRecoilValue(gameState);
  return (
    <h3 className="game-title">
      {t("Level")} {level} / 14
    </h3>
  );
};

export default GameLevel;
