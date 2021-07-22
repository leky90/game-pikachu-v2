import { memo, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import usePlaySound, { Sound } from "../../hooks/usePlaySound";
import gameSoundState from "../../recoil/atoms/gameSoundState";

const BiteSound = () => {
  const { playSound: playBiteSound, loadedSound } = usePlaySound(Sound.BITE);
  const setSounds = useSetRecoilState(gameSoundState);
  useEffect(() => {
    if (loadedSound !== null) {
      setSounds((sounds) => ({ ...sounds, playBiteSound }));
    }
  }, [loadedSound, playBiteSound, setSounds]);
  return null;
};

function areLoaded() {
  return true;
}

export default memo(BiteSound, areLoaded);
