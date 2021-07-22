import { FC } from "react";
import BiteSound from "./Sound/BiteSound";
import CompletedGameSound from "./Sound/CompletedGameSound";
import OpenMenuSound from "./Sound/OpenMenuSound";
import DisableSound from "./Sound/DisableSound";
import EnableSound from "./Sound/EnableSound";
import FanfareSound from "./Sound/FanfareSound";
import FailedGameSound from "./Sound/FailedGameSound";
import GameSongSound from "./Sound/GameSongSound";
import LevelUpSound from "./Sound/LevelUpSound";
import NearlyEndTimeSound from "./Sound/NearlyEndTimeSound";
import OffSound from "./Sound/OffSound";
import OnSound from "./Sound/OnSound";
import PopDownSound from "./Sound/PopDownSound";
import PopUpOffSound from "./Sound/PopUpOffSound";
import PopUpOnSound from "./Sound/PopUpOnSound";
import YouWinSound from "./Sound/YouWinSound";
import RisingPopSound from "./Sound/RisingPopSound";
import YoutubeThemeSong from "./Sound/YoutubeThemeSong";
import GlugSound from "./Sound/GlugSound";

const SoundProvider: FC = ({ children }) => {
  return (
    <>
      <YoutubeThemeSong />
      <BiteSound />
      <CompletedGameSound />
      <DisableSound />
      <EnableSound />
      <FailedGameSound />
      <FanfareSound />
      <GameSongSound />
      <LevelUpSound />
      <NearlyEndTimeSound />
      <OffSound />
      <OnSound />
      <OpenMenuSound />
      <PopDownSound />
      <PopUpOffSound />
      <PopUpOnSound />
      <RisingPopSound />
      <YouWinSound />
      <GlugSound />
      {children}
    </>
  );
};

export default SoundProvider;
