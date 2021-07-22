import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import usePlaySound, { Sound } from "../../hooks/usePlaySound";
import gameSoundState from "../../recoil/atoms/gameSoundState";

const DisableSound = () => {
  const { playSound: playDisableSound, loadedSound } = usePlaySound(
    Sound.DISABLE
  );
  const setSounds = useSetRecoilState(gameSoundState);
  useEffect(() => {
    if (loadedSound !== null) {
      setSounds((sounds) => ({ ...sounds, playDisableSound }));
    }
  }, [loadedSound, playDisableSound, setSounds]);
  return null;
};

export default DisableSound;
