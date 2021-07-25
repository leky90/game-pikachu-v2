import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import gameState from "../recoil/atoms/gameState";
import selectedPokemonsSelector from "../recoil/selectors/selectedPokemonsSelector";
import selectedPokemonsState from "../recoil/atoms/selectedPokemonsState";
import gameOverlayState from "../recoil/atoms/gameOverlayState";
import gameSoundState from "../recoil/atoms/gameSoundState";
import { useCallback } from "react";
import {
  BONUS_POINTS,
  GameLevel,
  gameOptions,
  GameSocketEvents,
  GameSocketMessage,
  GameStatus,
  LEVEL_UP_POINTS,
  PENALTY_POINTS,
} from "../types/game";
import { generatePokemonMatrix, makeListPokemons } from "../utils/game";
import gameBattleState from "../recoil/atoms/gameBattleState";
import gameBattlePointsState from "../recoil/atoms/gameBattlePointsState";

export function useGameBattleActions() {
  const setGame = useSetRecoilState(gameState);
  const resetGameState = useResetRecoilState(gameState);
  const setSelectedPokemons = useSetRecoilState(selectedPokemonsSelector);
  const resetSelectedPokemonsState = useResetRecoilState(selectedPokemonsState);
  const setGameBattle = useSetRecoilState(gameBattleState);
  const setGameOverlay = useSetRecoilState(gameOverlayState);
  const resetGameOverlayState = useResetRecoilState(gameOverlayState);
  const setGameBattlePoints = useSetRecoilState(gameBattlePointsState);
  const resetGameBattlePoints = useResetRecoilState(gameBattlePointsState);
  const {
    playBiteSound,
    playYouWinSound,
    playDisableSound,
    playOpenMenuSound,
    playRisingPopSound,
    playGlugSound,
  } = useRecoilValue(gameSoundState);

  const selectBattlePokemon = (
    pokemonId: string,
    rowIndex: number,
    colIndex: number
  ) => {
    playBiteSound && playBiteSound();
    setSelectedPokemons({ nid: pokemonId, rowIndex, colIndex });
  };

  const resetGame = () => {
    resetGameState();
    resetGameOverlayState();
    resetSelectedPokemonsState();
    setGameBattle((gameBattle) => ({ ...gameBattle, allReady: [] }));
    reSetupGame();
  };

  const initGame = useCallback(
    (level: GameLevel, status: GameStatus = GameStatus.PENDING) => {
      const { row, col } = gameOptions[level];
      const pokemons = makeListPokemons(row, col);
      const { pokemonMatrix, pokemons: newPokemons } = generatePokemonMatrix(
        pokemons,
        row,
        col
      );
      setGame({
        pokemons: newPokemons,
        matrix: pokemonMatrix,
        level,
        row,
        col,
        status,
      });
    },
    [setGame]
  );

  const reSetupGame = () => {
    initGame(GameLevel.LEVEL_1);
  };

  const endGame = (winner: string) => {
    playYouWinSound && playYouWinSound();
    setGame((prevGame) => ({
      ...prevGame,
      status: GameStatus.COMPLETED,
    }));
    setGameBattle((prevGame) => ({
      ...prevGame,
      winner,
      allReady: [],
    }));
  };

  const startGame = () => {
    setGame((prevGame) => ({
      ...prevGame,
      status: GameStatus.RUNNING,
    }));
  };

  const onReadyGame = () => {
    setGame((prevGame) => ({
      ...prevGame,
      status: GameStatus.READY,
    }));
    setGameBattle((prevGame) => ({
      ...prevGame,
      winner: undefined,
    }));
    resetGameBattlePoints();
  };

  const increaseYourPoints = () => {
    playRisingPopSound && playRisingPopSound();
    setGameBattlePoints((gameBattlePoints) => ({
      ...gameBattlePoints,
      yourPoint: gameBattlePoints.yourPoint + BONUS_POINTS,
    }));
  };

  const decreaseYourPoints = () => {
    playGlugSound && playGlugSound();
    setGameBattlePoints((gameBattlePoints) => ({
      ...gameBattlePoints,
      yourPoint: gameBattlePoints.yourPoint - PENALTY_POINTS,
    }));
  };

  const handleSocketEvents = ({
    event,
    content,
    player,
    command,
    match,
    currentPlayer,
  }: GameSocketMessage) => {
    console.log("handleSocketEvents", {
      event,
      content,
      player,
      command,
      match,
      currentPlayer,
    });
    switch (event) {
      case GameSocketEvents.READY:
        playOpenMenuSound && playOpenMenuSound();
        setGameBattle((gameBattle) => ({
          ...gameBattle,
          allReady: gameBattle.allReady.includes(player)
            ? gameBattle.allReady
            : [...gameBattle.allReady, player],
        }));
        break;
      case GameSocketEvents.UNREADY:
        playDisableSound && playDisableSound();
        setGameBattle((gameBattle) => ({
          ...gameBattle,
          allReady: gameBattle.allReady.filter(
            (playerReady) => playerReady !== player
          ),
        }));
        break;
      case GameSocketEvents.JOINED:
        if (player !== currentPlayer)
          playRisingPopSound && playRisingPopSound();
        setGameBattle((gameBattle) => ({
          ...gameBattle,
          competitor:
            player === currentPlayer
              ? gameBattle.competitor
              : player === gameBattle.competitor
              ? gameBattle.competitor
              : player,
        }));
        resetGame();
        break;
      case GameSocketEvents.QUIT:
        setGameBattle((gameBattle) => ({
          ...gameBattle,
          competitor: undefined,
          allReady:
            player === currentPlayer
              ? []
              : gameBattle.allReady.filter(
                  (playerReady) => playerReady === currentPlayer
                ),
        }));
        break;
      case GameSocketEvents.INCREASE_COMPETITOR_POINTS:
        if (player !== currentPlayer) {
          setGameBattlePoints((gameBattlePoints) => ({
            ...gameBattlePoints,
            competitorPoint: gameBattlePoints.competitorPoint + BONUS_POINTS,
          }));
        }
        break;
      case GameSocketEvents.DECREASE_COMPETITOR_POINTS:
        if (player !== currentPlayer) {
          setGameBattlePoints((gameBattlePoints) => ({
            ...gameBattlePoints,
            competitorPoint: gameBattlePoints.competitorPoint - BONUS_POINTS,
          }));
        }
        break;
      case GameSocketEvents.FREEZE_COMPETITOR_BOARD:
        if (player !== currentPlayer) {
          setGameOverlay((gameOverlayState) => ({
            ...gameOverlayState,
            freezing: true,
          }));
        }
        break;
      case GameSocketEvents.LEVEL_UP_POINTS:
        if (player !== currentPlayer) {
          setGameBattlePoints((gameBattlePoints) => ({
            ...gameBattlePoints,
            competitorPoint: gameBattlePoints.competitorPoint + LEVEL_UP_POINTS,
          }));
        }
        break;
      default:
        break;
    }
  };

  return {
    initGame,
    reSetupGame,
    startGame,
    onReadyGame,
    endGame,
    selectBattlePokemon,
    resetGame,
    increaseYourPoints,
    decreaseYourPoints,
    handleSocketEvents,
  };
}
