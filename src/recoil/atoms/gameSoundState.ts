import { atom } from "recoil";
import { GameSound, GameTypeState } from "../../types/game";

const gameSoundState = atom<GameSound>({
  key: GameTypeState.GAME_SOUND_STATE,
  default: {
    soundReady: false,
    playOpenMenuSound: () => {},
    playEnableSound: () => {},
    playDisableSound: () => {},
    playCompletedGameSound: () => {},
    playFailedGameSound: () => {},
    playBiteSound: () => {},
    playRisingPopSound: () => {},
    playFanfareSound: () => {},
    playGlugSound: () => {},
    playNearlyEndTimeSound: () => {},
    playOffSound: () => {},
    playOnSound: () => {},
    playLevelUpSound: () => {},
    playPopDownSound: () => {},
    playPopUpOnSound: () => {},
    playPopUpOffSound: () => {},
    playYouWinSound: () => {},
  },
});

export default gameSoundState;
