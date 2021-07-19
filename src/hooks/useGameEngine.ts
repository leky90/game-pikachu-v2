import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import gameSoundState from "../recoil/atoms/gameSoundState";
import gameState from "../recoil/atoms/gameState";
import gameTimingState from "../recoil/atoms/gameTimingState";
import {
  GameLevel,
  GameMode,
  gameOptions,
  GameStatus,
  nextLevel,
  Pokemon,
} from "../types/game";
import {
  generatePokemonMatrix,
  makeListPokemons,
  checkCompletedLevel,
  hasAnyConnectLine,
  reShufflePokemonList,
} from "../utils/game";

export default function useGameEngine(mode: GameMode) {
  const location = useLocation();
  const setGame = useSetRecoilState(gameState);
  const setGameTiming = useSetRecoilState(gameTimingState);
  const {
    playFanfareSound,
    playLevelUpSound,
    playCompletedGameSound,
    playYouWinSound,
  } = useRecoilValue(gameSoundState);
  const { matrix, row, col, status, pokemons, level } =
    useRecoilValue(gameState);

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
      setGameTiming({ timing: 30, yourTiming: 0 });
    }
    if (mode === GameMode.SPEED_MODE) {
      setGameTiming({ timing: 0 });
    }
  };

  const endGame = () => {
    if (mode === GameMode.SURVIVAL_MODE) {
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
  };

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

  useEffect(() => {
    if (status === GameStatus.PENDING) {
      playFanfareSound();
      initGame(level);
      if (mode === GameMode.SURVIVAL_MODE) {
        setGameTiming({ timing: 300, yourTiming: 0 });
      }
      if (mode === GameMode.SPEED_MODE) {
        setGameTiming({ timing: 0 });
      }
    }
    return () => {
      // cleanup
    };
  }, [status, initGame]);

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

  useEffect(() => {
    if (status === GameStatus.RUNNING) {
      playFanfareSound();
      initGame(GameLevel.LEVEL_1);
      if (mode === GameMode.SURVIVAL_MODE) {
        setGameTiming({ timing: 300, yourTiming: 0 });
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
