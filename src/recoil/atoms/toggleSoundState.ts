import { atom } from "recoil";

const toggleSoundState = atom<{ music: number; effect: number }>({
  key: "TOGGLE_SOUND",
  default: {
    music: 0,
    effect: 1,
  },
});

export default toggleSoundState;
