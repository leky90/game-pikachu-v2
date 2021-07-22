import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import usePlaySound, { Sound } from "../../hooks/usePlaySound";
import gameSoundState from "../../recoil/atoms/gameSoundState";

const FailedGameSound = () => {
  const { playSound: playFailedGameSound, loadedSound } = usePlaySound(
    Sound.FAIL_GAME
  );
  const setSounds = useSetRecoilState(gameSoundState);
  useEffect(() => {
    if (loadedSound !== null) {
      setSounds((sounds) => ({ ...sounds, playFailedGameSound }));
    }
  }, [loadedSound, setSounds, playFailedGameSound]);
  return null;
};

export default FailedGameSound;
