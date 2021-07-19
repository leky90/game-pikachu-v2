import "./App.css";
import { Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { Routes } from "./routes/CONSTANTS";
import SinglePlayerPage from "./pages/SinglePlayerPage";
import MultiPlayerPage from "./pages/MultiPlayerPage";
import SpeedModePage from "./pages/SpeedModePage";
import { useRecoilValue } from "recoil";
import gameSoundState from "./recoil/atoms/gameSoundState";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  const { soundReady } = useRecoilValue(gameSoundState);

  return (
    <div className="app">
      {!soundReady && <h1>{t("Loading resources...")}</h1>}
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
          <Route path="*">
            <MainPage />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
