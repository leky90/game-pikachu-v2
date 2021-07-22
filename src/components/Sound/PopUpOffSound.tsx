import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import usePlaySound, { Sound } from "../../hooks/usePlaySound";
import gameSoundState from "../../recoil/atoms/gameSoundState";

const PopUpOffSound = () => {
  const { playSound: playPopUpOffSound, loadedSound } = usePlaySound(
    Sound.POP_UP_OFF
  );
  const setSounds = useSetRecoilState(gameSoundState);
  useEffect(() => {
    if (loadedSound !== null) {
      setSounds((sounds) => ({ ...sounds, playPopUpOffSound }));
    }
  }, [loadedSound, setSounds, playPopUpOffSound]);
  return null;
};

export default PopUpOffSound;
