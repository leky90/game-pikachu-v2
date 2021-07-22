import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import usePlaySound, { Sound } from "../../hooks/usePlaySound";
import gameSoundState from "../../recoil/atoms/gameSoundState";

const OpenMenuSound = () => {
  const { playSound: playOpenMenuSound, loadedSound } = usePlaySound(
    Sound.MENU_OPEN
  );
  const setSounds = useSetRecoilState(gameSoundState);
  useEffect(() => {
    if (loadedSound !== null) {
      setSounds((sounds) => ({ ...sounds, playOpenMenuSound }));
    }
  }, [loadedSound, setSounds, playOpenMenuSound]);
  return null;
};

export default OpenMenuSound;
