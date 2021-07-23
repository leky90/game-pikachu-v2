import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import useLocalStorage from "../hooks/useLocalStorage";
import { useSetRecoilState } from "recoil";
import playerState from "../recoil/atoms/playerState";
import { FormEventHandler } from "react";
import SwitchLanguage from "../components/SwitchLanguage";
import { useHistory } from "react-router-dom";
import { Routes } from "../routes/CONSTANTS";
import { nanoid } from "nanoid";

const PlayerPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const setPlayer = useSetRecoilState(playerState);
  const [_, saveLocalPlayerName] = useLocalStorage("playerName", "");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const playerName = event.currentTarget.playerName.value;
    if (playerName && playerName.trim() !== "") {
      if (playerName.match(/^[a-zA-Z0-9 ]*$/gim)) {
        const newPlayerName = playerName + "-" + nanoid(6);
        saveLocalPlayerName(newPlayerName);
        setPlayer({ playerName: newPlayerName, playerTiming: 0 });
        history.push(Routes.MAIN_PAGE);
      } else {
        alert(t("Accept alphabet and digit only."));
      }
    } else {
      alert(t("Please enter your name"));
    }
  };

  return (
    <div className="main-board">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pika pika! - Player board</title>
      </Helmet>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            name="playerName"
            autoFocus
            placeholder={t("Enter your name here")}
            maxLength={20}
            autoComplete="off"
          />
          <button>{t("Submit")}</button>
        </form>
        <SwitchLanguage />
      </div>
    </div>
  );
};

export default PlayerPage;
