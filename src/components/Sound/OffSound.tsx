import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import usePlaySound, { Sound } from "../../hooks/usePlaySound";
import gameSoundState from "../../recoil/atoms/gameSoundState";

const OffSound = () => {
  const { playSound: playOffSound, loadedSound } = usePlaySound(Sound.OFF);
  const setSounds = useSetRecoilState(gameSoundState);
  useEffect(() => {
    if (loadedSound !== null) {
      setSounds((sounds) => ({ ...sounds, playOffSound }));
    }
  }, [loadedSound, playOffSound, setSounds]);
  return null;
};

export default OffSound;
