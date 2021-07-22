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
import { addNewRanking, TopPlayer, updateNewRanking } from "../api/ranking";
import playerState from "../recoil/atoms/playerState";

export function useGameActions(mode: GameMode) {
  const setGame = useSetRecoilState(gameState);
  const setPlayer = useSetRecoilState(playerState);
  const setGameTiming = useSetRecoilState(gameTimingState);
  const setSelectedPokemons = useSetRecoilState(selectedPokemonsSelector);
  const resetGameState = useResetRecoilState(gameState);
  const resetGameOverlayState = useResetRecoilState(gameOverlayState);
  const resetSelectedPokemonsState = useResetRecoilState(selectedPokemonsState);
  const { playBiteSound, playFanfareSound, playNearlyEndTimeSound } =
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
      setPlayer((currentPlayer) => ({ ...currentPlayer, playerTiming: 0 }));
    },
    [setGame]
  );

  const replayGame = (playerName: string) => {
    // playFanfareSound && playFanfareSound();
    initGame(GameLevel.LEVEL_1);
    addNewRankingScore(mode, playerName);
    if (mode === GameMode.SURVIVAL_MODE) {
      setGameTiming({ timing: BASE_START_TIME, yourTiming: 0 });
    }
    if (mode === GameMode.SPEED_MODE) {
      setGameTiming({ timing: 0 });
    }
  };

  const endGame = () => {
    if (mode === GameMode.SURVIVAL_MODE) {
      playNearlyEndTimeSound && playNearlyEndTimeSound();
      setGame((prevGame) => ({
        ...prevGame,
        status: GameStatus.COMPLETED,
      }));
    }
  };

  const addNewRankingScore = (mode: GameMode, playerName: string) => {
    const playerScore: TopPlayer = {
      mode,
      playerName,
      timestamp: Date.now(),
    };
    addNewRanking(playerScore).then((response) => {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        rankingId: response.id,
      }));
    });
  };

  const updateNewRankingScore = (
    id: string,
    mode: GameMode,
    playerName: string,
    timing: number
  ) => {
    const playerScore: TopPlayer = {
      mode,
      playerName,
      timing,
      timestamp: Date.now(),
    };
    updateNewRanking(id, playerScore);
  };

  return {
    initGame,
    replayGame,
    endGame,
    selectPokemon,
    resetGame,
    addNewRankingScore,
    updateNewRankingScore,
  };
}
