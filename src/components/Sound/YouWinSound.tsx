import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import usePlaySound, { Sound } from "../../hooks/usePlaySound";
import gameSoundState from "../../recoil/atoms/gameSoundState";

const YouWinSound = () => {
  const { playSound: playYouWinSound, loadedSound } = usePlaySound(
    Sound.YOU_WIN
  );
  const setSounds = useSetRecoilState(gameSoundState);
  useEffect(() => {
    if (loadedSound !== null) {
      setSounds((sounds) => ({ ...sounds, playYouWinSound }));
    }
  }, [loadedSound, playYouWinSound, setSounds]);
  return null;
};

export default YouWinSound;
