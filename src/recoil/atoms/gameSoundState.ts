import { atom } from "recoil";
import { GameSound, GameTypeState } from "../../types/game";

const gameSoundState = atom<GameSound>({
  key: GameTypeState.GAME_SOUND_STATE,
  default: {
    soundReady: false,
    gameSongDuration: 0,
    playOpenMenuSound: undefined,
    playEnableSound: undefined,
    playDisableSound: undefined,
    playCompletedGameSound: undefined,
    playFailedGameSound: undefined,
    playBiteSound: undefined,
    playRisingPopSound: undefined,
    playFanfareSound: undefined,
    playGlugSound: undefined,
    playNearlyEndTimeSound: undefined,
    playOffSound: undefined,
    playOnSound: undefined,
    playLevelUpSound: undefined,
    playPopDownSound: undefined,
    playPopUpOnSound: undefined,
    playPopUpOffSound: undefined,
    playYouWinSound: undefined,
    playGameSong: undefined,
  },
});

export default gameSoundState;
