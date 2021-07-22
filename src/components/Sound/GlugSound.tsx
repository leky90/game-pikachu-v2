import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import usePlaySound, { Sound } from "../../hooks/usePlaySound";
import gameSoundState from "../../recoil/atoms/gameSoundState";

const GlugSound = () => {
  const { playSound: playGlugSound, loadedSound } = usePlaySound(Sound.GLUG);
  const setSounds = useSetRecoilState(gameSoundState);
  useEffect(() => {
    if (loadedSound !== null) {
      setSounds((sounds) => ({ ...sounds, playGlugSound }));
    }
  }, [loadedSound, setSounds, playGlugSound]);
  return null;
};

export default GlugSound;
