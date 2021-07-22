import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import usePlaySound, { Sound } from "../../hooks/usePlaySound";
import gameSoundState from "../../recoil/atoms/gameSoundState";

const EnableSound = () => {
  const { playSound: playEnableSound, loadedSound } = usePlaySound(
    Sound.ENABLE
  );
  const setSounds = useSetRecoilState(gameSoundState);
  useEffect(() => {
    if (loadedSound !== null) {
      setSounds((sounds) => ({ ...sounds, playEnableSound }));
    }
  }, [loadedSound, playEnableSound, setSounds]);
  return null;
};

export default EnableSound;
