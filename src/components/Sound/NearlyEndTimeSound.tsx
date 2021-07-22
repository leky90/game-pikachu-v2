import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import usePlaySound, { Sound } from "../../hooks/usePlaySound";
import gameSoundState from "../../recoil/atoms/gameSoundState";

const NearlyEndTimeSound = () => {
  const { playSound: playNearlyEndTimeSound, loadedSound } = usePlaySound(
    Sound.NEARLY_END_TIME
  );
  const setSounds = useSetRecoilState(gameSoundState);
  useEffect(() => {
    if (loadedSound !== null) {
      setSounds((sounds) => ({ ...sounds, playNearlyEndTimeSound }));
    }
  }, [loadedSound, setSounds, playNearlyEndTimeSound]);
  return null;
};

export default NearlyEndTimeSound;
