import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import usePlaySound, { Sound } from "../../hooks/usePlaySound";
import gameSoundState from "../../recoil/atoms/gameSoundState";

const GameSongSound = () => {
  const {
    playSound: playGameSong,
    loadedSound,
    duration,
  } = usePlaySound(Sound.GAME_SONG);
  const setSounds = useSetRecoilState(gameSoundState);

  useEffect(() => {
    if (loadedSound !== null) {
      setSounds((sounds) => ({
        ...sounds,
        soundReady: true,
        gameSongDuration: duration ?? 0,
        playGameSong,
      }));
    }
  }, [loadedSound]);

  return null;
};

export default GameSongSound;
