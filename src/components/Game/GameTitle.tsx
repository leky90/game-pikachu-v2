import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import gameState from "../../recoil/atoms/gameState";
import playerState from "../../recoil/atoms/playerState";
import { GameStatus } from "../../types/game";

const GameTitle: FC<{ title: string }> = ({ title }) => {
  const { t } = useTranslation();
  const { playerName } = useRecoilValue(playerState);
  const { status } = useRecoilValue(gameState);
  return (
    <h1 className="game-title">
      {status === GameStatus.COMPLETED
        ? t("Congratulations") + " " + playerName.replace(/-.*$/g, "")
        : title}
    </h1>
  );
};

export default GameTitle;
