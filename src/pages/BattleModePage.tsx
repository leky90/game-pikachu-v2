import { Helmet } from "react-helmet";
import { useHistory, useParams } from "react-router-dom";
import useAsync, { ResponseStatus } from "../hooks/useAsync";
import { getPlayersInGame } from "../api/game";
import { useCallback, useEffect } from "react";
import GameBattleContainer from "../components/Game/GameBattleContainner";
import playerState from "../recoil/atoms/playerState";
import { useRecoilValue } from "recoil";
import { Routes } from "../routes/CONSTANTS";
import { useTranslation } from "react-i18next";

const BattleModePage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { gameId } = useParams<{ gameId: string }>();
  const { player } = useRecoilValue(playerState);
  const fetchPlayersInGame = useCallback(
    () => getPlayersInGame(gameId),
    [gameId]
  );
  const { status: fetchStatus, value: playersInGameResponse } =
    useAsync(fetchPlayersInGame);

  const playersInGame: string[] = playersInGameResponse?.data ?? [];

  useEffect(() => {
    if (fetchStatus === ResponseStatus.SUCCESS) {
      if (playersInGame.length >= 2 && !playersInGame.includes(player)) {
        alert(t("The game was full slot!!!"));
        history.push(Routes.MULTI_PLAYER_PAGE);
      }
    }
  }, [fetchStatus]);

  return (
    <div className="game-battle-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pika pika! - Battle mode board</title>
      </Helmet>
      {fetchStatus === ResponseStatus.SUCCESS && gameId && (
        <GameBattleContainer gameId={gameId} player={player} />
      )}
    </div>
  );
};

export default BattleModePage;
