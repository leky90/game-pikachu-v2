import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import usePlaySound, { Sound } from "../../hooks/usePlaySound";
import gameSoundState from "../../recoil/atoms/gameSoundState";

const PopDownSound = () => {
  const { playSound: playPopDownSound, loadedSound } = usePlaySound(
    Sound.POP_DOWN
  );
  const setSounds = useSetRecoilState(gameSoundState);
  useEffect(() => {
    if (loadedSound !== null) {
      setSounds((sounds) => ({ ...sounds, playPopDownSound }));
    }
  }, [loadedSound, setSounds, playPopDownSound]);
  return null;
};

export default PopDownSound;
