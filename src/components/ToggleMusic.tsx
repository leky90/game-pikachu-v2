import { useRecoilState } from "recoil";
import toggleSoundState from "../recoil/atoms/toggleSoundState";

const ToggleMusic = () => {
  const [sound, toggleSound] = useRecoilState(toggleSoundState);
  const classSound = sound.music ? "icono-blue" : "icono-black";

  return (
    <div
      className="toggle-music-effect"
      onClick={() => {
        toggleSound((prevValue) => ({
          ...prevValue,
          music: prevValue.music === 1 ? 0 : 1,
        }));
      }}
    >
      <i className={`icono-music ${classSound}`}></i>
    </div>
  );
};

export default ToggleMusic;
