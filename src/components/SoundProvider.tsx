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
  const { playSound: playPopDownSound, loadedSound: loadedPopDownSound } =
    usePlaySound(Sound.POP_DOWN);
  const { playSound: playPopUpOnSound, loadedSound: loadedPopUpOnSound } =
    usePlaySound(Sound.POP_UP_OFF);
  const { playSound: playPopUpOffSound, loadedSound: loadedPopUpOffSound } =
    usePlaySound(Sound.POP_UP_ON);
  const { playSound: playLevelUpSound, loadedSound: loadedLevelUpSound } =
    usePlaySound(Sound.LEVEL_UP);
  const { playSound: playYouWinSound, loadedSound: loadedYouWinSound } =
    usePlaySound(Sound.YOU_WIN);
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
      loadedPopDownSound !== null &&
      loadedPopUpOnSound !== null &&
      loadedPopUpOffSound !== null &&
      loadedLevelUpSound !== null &&
      loadedYouWinSound !== null &&
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
          playPopUpOnSound,
          playPopUpOffSound,
          playLevelUpSound,
          playPopDownSound,
          playYouWinSound,
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
    loadedPopUpOnSound,
    loadedPopUpOffSound,
    loadedLevelUpSound,
    loadedPopDownSound,
    loadedYouWinSound,
  ]);

  return <>{children}</>;
};

export default SoundProvider;
