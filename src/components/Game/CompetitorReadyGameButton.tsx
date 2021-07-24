import { FC, MouseEventHandler, useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import gameBattleState from "../../recoil/atoms/gameBattleState";
import gameSoundState from "../../recoil/atoms/gameSoundState";
import { GameStatus } from "../../types/game";
import { getPlayerID, getPlayerName } from "../../utils/game";

interface CompetitorReadyGameButtonProps {
  status: GameStatus;
  player: string;
}

const CompetitorReadyGameButton: FC<CompetitorReadyGameButtonProps> = ({
  status,
  player,
}) => {
  const { t } = useTranslation();
  const { playPopUpOnSound } = useRecoilValue(gameSoundState);
  const { allReady, competitor } = useRecoilValue(gameBattleState);
  const classReady = allReady.includes(competitor ?? "") ? "ready" : "";

  useEffect(() => {
    playPopUpOnSound && playPopUpOnSound();
  }, [competitor]);

  return (
    <>
      <button className={`button-${status} ${classReady}`}>{t("Ready")}</button>
      {competitor && (
        <span>
          <em>(ID: {getPlayerID(competitor)})</em> {getPlayerName(competitor)}{" "}
        </span>
      )}
      <strong>:{t("Competitor")}</strong>
    </>
  );
};

export default CompetitorReadyGameButton;
