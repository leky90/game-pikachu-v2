import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import gameSoundState from "../recoil/atoms/gameSoundState";
import gameState from "../recoil/atoms/gameState";
import gameTimingState from "../recoil/atoms/gameTimingState";
import playerState from "../recoil/atoms/playerState";
import {
  BASE_START_TIME,
  GameLevel,
  GameMode,
  GameStatus,
  nextLevel,
  Pokemon,
} from "../types/game";
import {
  generatePokemonMatrix,
  checkCompletedLevel,
  hasAnyConnectLine,
  reShufflePokemonList,
} from "../utils/game";
import { useGameActions } from "./useGameActions";

export default function useGameEngine(mode: GameMode) {
  const location = useLocation();
  const {
    initGame,
    replayGame,
    endGame,
    addNewRankingScore,
    updateNewRankingScore,
  } = useGameActions(mode);
  const setGame = useSetRecoilState(gameState);
  const currentPlayer = useRecoilValue(playerState);
  const setGameTiming = useSetRecoilState(gameTimingState);
  const {
    playFanfareSound,
    playLevelUpSound,
    playCompletedGameSound,
    playYouWinSound,
  } = useRecoilValue(gameSoundState);
  const { matrix, row, col, status, pokemons, level } =
    useRecoilValue(gameState);

  const shuffleMatrix = (pokemons: Record<string, Pokemon>) => {
    const newShufflePokemons = reShufflePokemonList(pokemons);
    const { pokemonMatrix, pokemons: newPokemons } = generatePokemonMatrix(
      newShufflePokemons,
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
  };

  // Setup game
  useEffect(() => {
    if (status === GameStatus.PENDING) {
      playFanfareSound();
      initGame(level);
      addNewRankingScore(mode, currentPlayer.playerName);
      if (mode === GameMode.SURVIVAL_MODE) {
        setGameTiming({ timing: BASE_START_TIME, yourTiming: 0 });
      }
      if (mode === GameMode.SPEED_MODE) {
        setGameTiming({ timing: 0 });
      }
    }
    return () => {
      // cleanup
    };
  }, [status, initGame]);

  // Check game completed and post result
  useEffect(() => {
    if (status === GameStatus.COMPLETED) {
      if (currentPlayer.rankingId) {
        updateNewRankingScore(
          currentPlayer.rankingId,
          mode,
          currentPlayer.playerName,
          currentPlayer.playerTiming
        );
      }
    }
  }, [currentPlayer.rankingId, currentPlayer.playerTiming]);

  // Check completed one level and re-start new one higher level
  useEffect(() => {
    if (checkCompletedLevel(pokemons)) {
      const levelUp: GameLevel = nextLevel[level];
      if (level !== levelUp || mode === GameMode.SURVIVAL_MODE) {
        initGame(levelUp);
        playCompletedGameSound();
      } else {
        if (mode === GameMode.SPEED_MODE) {
          playYouWinSound();
          setGame({
            matrix,
            row,
            col,
            pokemons,
            level,
            status: GameStatus.COMPLETED,
          });
        }
      }
    } else {
      if (
        Object.keys(pokemons).length &&
        hasAnyConnectLine(pokemons, matrix, row, col) === false
      ) {
        shuffleMatrix(pokemons);
        playLevelUpSound();
      }
    }
  }, [pokemons]);

  // Setup new game if access directly from browser
  useEffect(() => {
    if (status === GameStatus.RUNNING) {
      playFanfareSound();
      initGame(GameLevel.LEVEL_1);
      if (mode === GameMode.SURVIVAL_MODE) {
        setGameTiming({ timing: BASE_START_TIME, yourTiming: 0 });
      }
      if (mode === GameMode.SPEED_MODE) {
        setGameTiming({ timing: 0 });
      }
    }
  }, [location]);

  return {
    initGame,
    replayGame,
    endGame,
    matrix,
    row,
    col,
    status,
    level,
  };
}
