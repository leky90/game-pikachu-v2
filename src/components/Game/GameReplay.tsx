import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import playerState from "../../recoil/atoms/playerState";

const GameReplay: FC<{ action: Function }> = ({ action }) => {
  const { t } = useTranslation();
  const { player } = useRecoilValue(playerState);
  return (
    <p>
      <button onClick={() => action(player)}>{t("Replay")}</button>
    </p>
  );
};

export default GameReplay;
