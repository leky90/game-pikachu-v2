import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import usePlaySound, { Sound } from "../../hooks/usePlaySound";
import gameSoundState from "../../recoil/atoms/gameSoundState";

const RisingPopSound = () => {
  const { playSound: playRisingPopSound, loadedSound } = usePlaySound(
    Sound.RISING_POP
  );
  const setSounds = useSetRecoilState(gameSoundState);
  useEffect(() => {
    if (loadedSound !== null) {
      setSounds((sounds) => ({ ...sounds, playRisingPopSound }));
    }
  }, [loadedSound, playRisingPopSound, setSounds]);
  return null;
};

export default RisingPopSound;
