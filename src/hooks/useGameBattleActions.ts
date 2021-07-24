import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import gameState from "../recoil/atoms/gameState";
import selectedPokemonsSelector from "../recoil/selectors/selectedPokemonsSelector";
import selectedPokemonsState from "../recoil/atoms/selectedPokemonsState";
import gameOverlayState from "../recoil/atoms/gameOverlayState";
import gameSoundState from "../recoil/atoms/gameSoundState";
import { useCallback } from "react";
import {
  GameLevel,
  gameOptions,
  GameSocketEvents,
  GameSocketMessage,
  GameStatus,
} from "../types/game";
import { generatePokemonMatrix, makeListPokemons } from "../utils/game";
import gameBattleState from "../recoil/atoms/gameBattleState";

export function useGameBattleActions() {
  const setGame = useSetRecoilState(gameState);
  const setSelectedPokemons = useSetRecoilState(selectedPokemonsSelector);
  const setGameBattle = useSetRecoilState(gameBattleState);
  const resetGameState = useResetRecoilState(gameState);
  const resetGameOverlayState = useResetRecoilState(gameOverlayState);
  const resetSelectedPokemonsState = useResetRecoilState(selectedPokemonsState);
  const { playBiteSound, playYouWinSound, playNearlyEndTimeSound } =
    useRecoilValue(gameSoundState);

  const selectPokemon = (
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

  const endGame = () => {
    // playNearlyEndTimeSound && playNearlyEndTimeSound();
    playYouWinSound && playYouWinSound();
    setGame((prevGame) => ({
      ...prevGame,
      status: GameStatus.COMPLETED,
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
        setGameBattle((gameBattle) => ({
          ...gameBattle,
          allReady: gameBattle.allReady.includes(player)
            ? gameBattle.allReady
            : [...gameBattle.allReady, player],
        }));
        break;
      case GameSocketEvents.UNREADY:
        setGameBattle((gameBattle) => ({
          ...gameBattle,
          allReady: gameBattle.allReady.filter(
            (playerReady) => playerReady !== player
          ),
        }));
        break;
      case GameSocketEvents.JOINED:
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
    selectPokemon,
    resetGame,
    handleSocketEvents,
  };
}
