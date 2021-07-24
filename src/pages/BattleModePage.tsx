import { Helmet } from "react-helmet";
import { useHistory, useParams } from "react-router-dom";
import useAsync, { ResponseStatus } from "../hooks/useAsync";
import { getPlayersInGame } from "../api/game";
import { useCallback } from "react";
import GameBattleContainer from "../components/Game/GameBattleContainner";
import playerState from "../recoil/atoms/playerState";
import { useRecoilValue } from "recoil";
import { Routes } from "../routes/CONSTANTS";

const BattleModePage = () => {
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

  if (fetchStatus === ResponseStatus.SUCCESS) {
    if (playersInGame.length >= 2) {
      history.push(Routes.MULTI_PLAYER_PAGE);
    }
  }

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
