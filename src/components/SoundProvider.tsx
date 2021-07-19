import { FC, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import usePlaySound, { Sound } from "../hooks/usePlaySound";
import gameSoundState from "../recoil/atoms/gameSoundState";

const SoundProvider: FC = ({ children }) => {
  const { playSound: playOpenMenuSound, loadedSound: loadedOpenMenuSound } =
    usePlaySound();
  const {
    playSound: playCompletedGameSound,
    loadedSound: loadedCompletedGameSound,
  } = usePlaySound(Sound.COMPLETE_GAME);
  const { playSound: playFailedGameSound, loadedSound: loadedFailedGameSound } =
    usePlaySound(Sound.FAIL_GAME);
  const { playSound: playBiteSound, loadedSound: loadedBiteSound } =
    usePlaySound(Sound.BITE);
  const { playSound: playDisableSound, loadedSound: loadedDisableSound } =
    usePlaySound(Sound.DISABLE);
  const { playSound: playEnableSound, loadedSound: loadedEnableSound } =
    usePlaySound(Sound.ENABLE);
  const { playSound: playOnSound, loadedSound: loadedOnSound } = usePlaySound(
    Sound.ON
  );
  const { playSound: playOffSound, loadedSound: loadedOffSound } = usePlaySound(
    Sound.OFF
  );
  const { playSound: playFanfareSound, loadedSound: loadedFanfareSound } =
    usePlaySound(Sound.FANFARE);
  const { playSound: playGlugSound, loadedSound: loadedGlugSound } =
    usePlaySound(Sound.GLUG);
  const {
    playSound: playNearlyEndTimeSound,
    loadedSound: loadedNearlyEndTimeSound,
  } = usePlaySound(Sound.NEARLY_END_TIME);
  const { playSound: playRisingPopSound, loadedSound: loadedRisingPopSound } =
    usePlaySound(Sound.RISING_POP);
  const setSounds = useSetRecoilState(gameSoundState);

  useEffect(() => {
    if (
      loadedDisableSound !== null &&
      loadedEnableSound !== null &&
      loadedFanfareSound !== null &&
      loadedNearlyEndTimeSound !== null &&
      loadedOpenMenuSound !== null &&
      loadedOnSound !== null &&
      loadedOffSound !== null &&
      loadedGlugSound !== null &&
      loadedRisingPopSound !== null &&
      loadedCompletedGameSound !== null &&
      loadedFailedGameSound !== null &&
      loadedBiteSound !== null
    ) {
      setTimeout(() => {
        setSounds({
          playFanfareSound,
          playGlugSound,
          playBiteSound,
          playCompletedGameSound,
          playDisableSound,
          playEnableSound,
          playFailedGameSound,
          playRisingPopSound,
          playOpenMenuSound,
          playOnSound,
          playOffSound,
          playNearlyEndTimeSound,
          soundReady: true,
        });
      }, 1000);
    }
  }, [
    loadedFanfareSound,
    loadedGlugSound,
    loadedBiteSound,
    loadedCompletedGameSound,
    loadedDisableSound,
    loadedEnableSound,
    loadedFailedGameSound,
    loadedRisingPopSound,
    loadedOpenMenuSound,
    loadedOnSound,
    loadedOffSound,
    loadedNearlyEndTimeSound,
  ]);

  return <>{children}</>;
};

export default SoundProvider;
