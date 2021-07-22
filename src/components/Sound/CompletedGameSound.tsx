import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import usePlaySound, { Sound } from "../../hooks/usePlaySound";
import gameSoundState from "../../recoil/atoms/gameSoundState";

const CompletedGameSound = () => {
  const { playSound: playCompletedGameSound, loadedSound } = usePlaySound(
    Sound.COMPLETE_GAME
  );
  const setSounds = useSetRecoilState(gameSoundState);
  useEffect(() => {
    if (loadedSound !== null) {
      setSounds((sounds) => ({ ...sounds, playCompletedGameSound }));
    }
  }, [loadedSound, setSounds, playCompletedGameSound]);
  return null;
};

export default CompletedGameSound;
