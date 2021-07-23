import { useRecoilState, useRecoilValue } from "recoil";
import gameSoundState from "../recoil/atoms/gameSoundState";
import toggleSoundState from "../recoil/atoms/toggleSoundState";

const ToggleSound = () => {
  const [sound, toggleSound] = useRecoilState(toggleSoundState);
  const { playDisableSound } = useRecoilValue(gameSoundState);
  const classSound = sound.effect ? "icono-volumeMedium" : "icono-volumeMute";

  return (
    <div
      className="toggle-sound-effect"
      onClick={() => {
        toggleSound((prevValue) => ({
          ...prevValue,
          effect: prevValue.effect === 1 ? 0 : 1,
        }));
        if (sound) {
          playDisableSound && playDisableSound();
        }
      }}
    >
      <i className={classSound}></i>
    </div>
  );
};

export default ToggleSound;
