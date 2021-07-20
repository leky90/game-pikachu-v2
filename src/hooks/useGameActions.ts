import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import gameState from "../recoil/atoms/gameState";
import selectedPokemonsSelector from "../recoil/selectors/selectedPokemonsSelector";
import selectedPokemonsState from "../recoil/atoms/selectedPokemonsState";
import gameOverlayState from "../recoil/atoms/gameOverlayState";
import gameSoundState from "../recoil/atoms/gameSoundState";
import { useCallback } from "react";
import {
  BASE_START_TIME,
  GameLevel,
  GameMode,
  gameOptions,
  GameStatus,
} from "../types/game";
import { generatePokemonMatrix, makeListPokemons } from "../utils/game";
import gameTimingState from "../recoil/atoms/gameTimingState";
import { addNewRanking, TopPlayer } from "../api/ranking";

export function useGameActions(mode: GameMode) {
  const setGame = useSetRecoilState(gameState);
  const setGameTiming = useSetRecoilState(gameTimingState);
  const setSelectedPokemons = useSetRecoilState(selectedPokemonsSelector);
  const resetGameState = useResetRecoilState(gameState);
  const resetGameOverlayState = useResetRecoilState(gameOverlayState);
  const resetSelectedPokemonsState = useResetRecoilState(selectedPokemonsState);
  const { playBiteSound, playFanfareSound, playYouWinSound } =
    useRecoilValue(gameSoundState);

  const selectPokemon = (
    pokemonId: string,
    rowIndex: number,
    colIndex: number
  ) => {
    playBiteSound();
    setSelectedPokemons({ nid: pokemonId, rowIndex, colIndex });
  };

  const resetGame = () => {
    resetGameState();
    resetGameOverlayState();
    resetSelectedPokemonsState();
  };

  const initGame = useCallback(
    (level: GameLevel) => {
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
        status: GameStatus.RUNNING,
      });
    },
    [setGame]
  );

  const replayGame = () => {
    playFanfareSound();
    initGame(GameLevel.LEVEL_1);
    if (mode === GameMode.SURVIVAL_MODE) {
      setGameTiming({ timing: BASE_START_TIME, yourTiming: 0 });
    }
    if (mode === GameMode.SPEED_MODE) {
      setGameTiming({ timing: 0 });
    }
  };

  const endGame = () => {
    if (mode === GameMode.SURVIVAL_MODE) {
      playYouWinSound();
      setGame((prevGame) => ({
        ...prevGame,
        status: GameStatus.COMPLETED,
      }));
    }
  };

  const addNewRankingScore = (
    mode: GameMode,
    timing: number,
    playerName: string
  ) => {
    const playerScore: TopPlayer = {
      mode,
      timing,
      playerName,
      timestamp: Date.now(),
    };
    addNewRanking(playerScore);
  };

  return {
    initGame,
    replayGame,
    endGame,
    selectPokemon,
    resetGame,
    addNewRankingScore,
  };
}
