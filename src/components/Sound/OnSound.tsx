import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import usePlaySound, { Sound } from "../../hooks/usePlaySound";
import gameSoundState from "../../recoil/atoms/gameSoundState";

const OnSound = () => {
  const { playSound: playOnSound, loadedSound } = usePlaySound(Sound.ON);
  const setSounds = useSetRecoilState(gameSoundState);
  useEffect(() => {
    if (loadedSound !== null) {
      setSounds((sounds) => ({ ...sounds, playOnSound }));
    }
  }, [loadedSound, playOnSound, setSounds]);
  return null;
};

export default OnSound;
