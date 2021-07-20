import "./App.css";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { Routes } from "./routes/CONSTANTS";
import SinglePlayerPage from "./pages/SinglePlayerPage";
import MultiPlayerPage from "./pages/MultiPlayerPage";
import SpeedModePage from "./pages/SpeedModePage";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import gameSoundState from "./recoil/atoms/gameSoundState";
import { useTranslation } from "react-i18next";
import i18n from "./services/i18n";
import { useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import SurvivalModePage from "./pages/SurvivalModePage";
import playerState from "./recoil/atoms/playerState";
import PlayerPage from "./pages/PlayerPage";

function App() {
  const { t } = useTranslation();
  const { soundReady } = useRecoilValue(gameSoundState);
  const history = useHistory();
  const [currentPlayer, setPlayer] = useRecoilState(playerState);
  const [language] = useLocalStorage("language", "vi");
  const [prevPlayerName, setPlayerName] = useLocalStorage("playerName", "");

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    if (
      prevPlayerName &&
      prevPlayerName !== "" &&
      prevPlayerName.match(/^[a-zA-Z0-9 ]*$/gim)
    ) {
      if (
        currentPlayer.playerName.trim() !== "" &&
        currentPlayer.playerName.match(/^[a-zA-Z0-9 ]*$/gim)
      ) {
        setPlayer({ playerName: currentPlayer.playerName, playerTiming: 0 });
      } else {
        setPlayer({ playerName: prevPlayerName, playerTiming: 0 });
      }
    } else {
      setPlayerName("");
      history.push(Routes.PLAYER_PAGE);
    }
  }, [prevPlayerName]);

  return (
    <div className="app">
      {!soundReady && <h1>{t("Preparing resource...")}</h1>}
      {soundReady && (
        <Switch>
          <Route path={Routes.MAIN_PAGE} exact>
            <MainPage />
          </Route>
          <Route path={Routes.SINGLE_PLAYER_PAGE} exact>
            <SinglePlayerPage />
          </Route>
          <Route path={Routes.MULTI_PLAYER_PAGE} exact>
            <MultiPlayerPage />
          </Route>
          <Route path={Routes.SPEED_MODE_PAGE} exact>
            <SpeedModePage />
          </Route>
          <Route path={Routes.SURVIVAL_MODE_PAGE} exact>
            <SurvivalModePage />
          </Route>
          <Route path={Routes.PLAYER_PAGE} exact>
            <PlayerPage />
          </Route>
          <Route path="*">
            <MainPage />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
