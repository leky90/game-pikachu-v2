import useSound from "use-sound";
import { SpriteMap } from "use-sound/dist/types";

import menuOpenSound from "../assets/sound/menu-open.mp3";
import disableSound from "../assets/sound/disable-sound.mp3";
import enableSound from "../assets/sound/enable-sound.mp3";
import onSound from "../assets/sound/switch-on.mp3";
import offSound from "../assets/sound/switch-off.mp3";
import biteSound from "../assets/sound/bite.mp3";
import fanfareSound from "../assets/sound/fanfare.mp3";
import glugSound from "../assets/sound/glug-a.mp3";
import risingPopSound from "../assets/sound/rising-pops.mp3";
import completeGameSound from "../assets/sound/game-completion.wav";
import failedGameSound from "../assets/sound/gamers-fail-game.mp3";
import nearlyEndTimeSound from "../assets/sound/time-limited.wav";
import levelUpSound from "../assets/sound/levelup.mp3";
import popDownSound from "../assets/sound/pop-down.mp3";
import popUpOnSound from "../assets/sound/pop-up-on.mp3";
import popUpOffSound from "../assets/sound/pop-up-off.mp3";
import youWinSound from "../assets/sound/you-win.mp3";
import gameSongSound from "../assets/sound/game-song.mp3";
import { useRecoilValue } from "recoil";
import toggleSoundState from "../recoil/atoms/toggleSoundState";

export enum Sound {
  MENU_OPEN = "MENU_OPEN",
  BITE = "BITE",
  DISABLE = "DISABLE",
  ENABLE = "ENABLE",
  ON = "ON",
  OFF = "OFF",
  FANFARE = "FANFARE",
  GLUG = "GLUG",
  RISING_POP = "RISING_POP",
  COMPLETE_GAME = "COMPLETE_GAME",
  FAIL_GAME = "FAIL_GAME",
  NEARLY_END_TIME = "NEARLY_END_TIME",
  LEVEL_UP = "LEVEL_UP",
  POP_DOWN = "POP_DOWN",
  POP_UP_ON = "POP_UP_ON",
  POP_UP_OFF = "POP_UP_OFF",
  YOU_WIN = "YOU_WIN",
  GAME_SONG = "GAME_SONG",
}

interface SoundOptions {
  id?: string;
  volume?: number;
  playbackRate?: number;
  interrupt?: boolean;
  soundEnabled?: boolean;
  sprite?: SpriteMap;
  onload?: () => void;
}

export default function usePlaySound(sound?: Sound) {
  const { music, effect } = useRecoilValue(toggleSoundState);
  const defaultConfigSound: SoundOptions = {
    interrupt: true,
    volume: effect,
  };
  let soundPath = menuOpenSound;
  if (sound) {
    switch (sound) {
      case Sound.BITE:
        soundPath = biteSound;
        break;
      case Sound.COMPLETE_GAME:
        soundPath = completeGameSound;
        break;
      case Sound.DISABLE:
        soundPath = disableSound;
        break;
      case Sound.ENABLE:
        soundPath = enableSound;
        break;
      case Sound.ON:
        soundPath = onSound;
        break;
      case Sound.OFF:
        soundPath = offSound;
        break;
      case Sound.FAIL_GAME:
        soundPath = failedGameSound;
        break;
      case Sound.GLUG:
        soundPath = glugSound;
        break;
      case Sound.FANFARE:
        soundPath = fanfareSound;
        break;
      case Sound.RISING_POP:
        soundPath = risingPopSound;
        break;
      case Sound.NEARLY_END_TIME:
        soundPath = nearlyEndTimeSound;
        break;
      case Sound.LEVEL_UP:
        soundPath = levelUpSound;
        break;
      case Sound.POP_DOWN:
        soundPath = popDownSound;
        break;
      case Sound.POP_UP_ON:
        soundPath = popUpOnSound;
        break;
      case Sound.POP_UP_OFF:
        soundPath = popUpOffSound;
        break;
      case Sound.YOU_WIN:
        soundPath = youWinSound;
        break;
      case Sound.GAME_SONG:
        soundPath = gameSongSound;
        // defaultConfigSound.volume = music;
        break;
      default:
        soundPath = menuOpenSound;
        break;
    }
  }

  const [
    play,
    { sound: loadedSound, stop: stopSound, pause: pauseSound, duration },
  ] = useSound(soundPath, defaultConfigSound);

  return {
    playSound: play,
    loadedSound,
    stopSound,
    pauseSound,
    duration,
    music,
    effect,
  };
}
