import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import usePlaySound, { Sound } from "../../hooks/usePlaySound";
import gameSoundState from "../../recoil/atoms/gameSoundState";

const PopUpOnSound = () => {
  const { playSound: playPopUpOnSound, loadedSound } = usePlaySound(
    Sound.POP_UP_ON
  );
  const setSounds = useSetRecoilState(gameSoundState);
  useEffect(() => {
    if (loadedSound !== null) {
      setSounds((sounds) => ({ ...sounds, playPopUpOnSound }));
    }
  }, [loadedSound, setSounds, playPopUpOnSound]);
  return null;
};

export default PopUpOnSound;
