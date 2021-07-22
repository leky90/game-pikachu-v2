import ReactPlayer from "react-player/youtube";
import { useRecoilValue } from "recoil";
import toggleSoundState from "../../recoil/atoms/toggleSoundState";

const YoutubeThemeSong = () => {
  const { music } = useRecoilValue(toggleSoundState);
  return (
    <div className="game-theme">
      <ReactPlayer
        url="https://www.youtube.com/watch?v=6ZUDiC6TB-k"
        playing={music ? true : false}
        loop
      />
    </div>
  );
};

export default YoutubeThemeSong;
