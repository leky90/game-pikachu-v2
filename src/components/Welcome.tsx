import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import playerState from "../recoil/atoms/playerState";

const Welcome = () => {
  const { t } = useTranslation();

  const player = useRecoilValue(playerState);
  return (
    <>
      <h2 className="text-center">
        {t("Welcome")}, <br />
        {player.playerName.replace(/-.*$/g, "")}
      </h2>
      <p className="text-center">
        ID: {player.playerName.replace(/^.*-/g, "")}
      </p>
    </>
  );
};

export default Welcome;
