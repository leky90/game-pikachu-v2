import { BASE_WS_URL } from "../../types/chat";
import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useSetRecoilState } from "recoil";
import gameBattleState from "../../recoil/atoms/gameBattleState";
import useGameBattleSocket from "../../hooks/useGameBattleSocket";
import { useGameBattleActions } from "../../hooks/useGameBattleActions";
import { GameSocketEvents } from "../../types/game";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Routes } from "../../routes/CONSTANTS";

interface GameBattleSocketProps {
  gameId: string;
  player: string;
}

const GameBattleSocket: FC<GameBattleSocketProps> = ({ gameId, player }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { handleSocketEvents } = useGameBattleActions();
  const setGameBattleState = useSetRecoilState(gameBattleState);
  const [socketUrl] = useState(`${BASE_WS_URL}/game`);
  const { sendJsonMessage, readyState } = useWebSocket(socketUrl, {
    reconnectAttempts: 10,
    reconnectInterval: 3000,
    retryOnError: true,
    shouldReconnect: () => true,
    queryParams: {
      player,
      gameId,
    },
    onOpen: (event) => {
      const subscribeMessage = {
        command: 0,
        match: gameId,
        player,
      };
      sendJsonMessage(subscribeMessage);
      const joinMessage = {
        command: 2,
        match: gameId,
        player,
        event: GameSocketEvents.JOINED,
      };
      sendJsonMessage(joinMessage);
    },
    onMessage: (event) => {
      const data = JSON.parse(event.data);
      const messageData = JSON.parse(data.content);
      messageData.currentPlayer = player;

      handleSocketEvents(messageData);
    },
    onError: (event) => {
      console.log("onError", event);
    },
    onClose: (event) => {
      console.log("onClose", event);
    },
  });

  const {
    sendReadyGame,
    sendUnReadyGame,
    sendQuitGame,
    sendSelectedPokemon,
    sendJoinedGame,
  } = useGameBattleSocket({
    sendJsonMessage,
    gameId,
    player,
  });

  useEffect(() => {
    setGameBattleState((gameBattleState) => ({
      ...gameBattleState,
      sendSelectedPokemon,
      sendReadyGame,
      sendUnReadyGame,
      sendQuitGame,
      sendJoinedGame,
    }));
  }, [
    sendSelectedPokemon,
    sendReadyGame,
    sendUnReadyGame,
    sendQuitGame,
    sendJoinedGame,
  ]);

  return readyState !== ReadyState.OPEN ? (
    <div className={`game-status socket-${ReadyState[readyState]}`}>
      <div className="service-status">
        {t("Service is not available now.")}
        <strong
          className="clickable"
          onClick={() => history.push(Routes.MULTI_PLAYER_PAGE)}
        >
          {t("Out")}
        </strong>
      </div>
    </div>
  ) : null;
};

function areEqualGame(
  prevProps: GameBattleSocketProps,
  nextProps: GameBattleSocketProps
) {
  return (
    prevProps.player === nextProps.player &&
    prevProps.gameId === nextProps.gameId
  );
}

export default memo(GameBattleSocket, areEqualGame);
