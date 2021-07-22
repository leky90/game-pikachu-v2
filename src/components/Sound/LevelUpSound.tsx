import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import usePlaySound, { Sound } from "../../hooks/usePlaySound";
import gameSoundState from "../../recoil/atoms/gameSoundState";

const LevelUpSound = () => {
  const { playSound: playLevelUpSound, loadedSound } = usePlaySound(
    Sound.LEVEL_UP
  );
  const setSounds = useSetRecoilState(gameSoundState);
  useEffect(() => {
    if (loadedSound !== null) {
      setSounds((sounds) => ({ ...sounds, playLevelUpSound }));
    }
  }, [loadedSound, setSounds, playLevelUpSound]);
  return null;
};

export default LevelUpSound;
