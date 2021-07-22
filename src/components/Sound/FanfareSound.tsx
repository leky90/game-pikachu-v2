import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import usePlaySound, { Sound } from "../../hooks/usePlaySound";
import gameSoundState from "../../recoil/atoms/gameSoundState";

const FanfareSound = () => {
  const { playSound: playFanfareSound, loadedSound } = usePlaySound(
    Sound.FANFARE
  );
  const setSounds = useSetRecoilState(gameSoundState);
  useEffect(() => {
    if (loadedSound !== null) {
      setSounds((sounds) => ({ ...sounds, playFanfareSound }));
    }
  }, [loadedSound, setSounds, playFanfareSound]);
  return null;
};

export default FanfareSound;
