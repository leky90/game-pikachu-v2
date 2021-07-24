import { createRef, useEffect, useLayoutEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import gameBattleState from "../recoil/atoms/gameBattleState";
import gameSoundState from "../recoil/atoms/gameSoundState";
import gameState from "../recoil/atoms/gameState";
import playerState from "../recoil/atoms/playerState";
import { GameLevel, GameStatus, nextLevel, Pokemon } from "../types/game";
import {
  generatePokemonMatrix,
  checkCompletedLevel,
  hasAnyConnectLine,
  reShufflePokemonList,
  randomLevel,
} from "../utils/game";
import { useGameBattleActions } from "./useGameBattleActions";
import { useLocation } from "react-router-dom";

export default function useGameBattleEngine() {
  const {
    playFanfareSound,
    playLevelUpSound,
    playCompletedGameSound,
    playYouWinSound,
  } = useRecoilValue(gameSoundState);
  const { initGame, resetGame, endGame, onReadyGame, startGame } =
    useGameBattleActions();
  const setGame = useSetRecoilState(gameState);
  const currentPlayer = useRecoilValue(playerState);
  const { matrix, row, col, status, pokemons, level } =
    useRecoilValue(gameState);
  const { allReady, competitor, sendJoinedGame, sendQuitGame } =
    useRecoilValue(gameBattleState);
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

  const competitorRef = useRef<undefined | string>(undefined);

  // quit room when refresh or close/redirect
  useLayoutEffect(() => {
    const sendQuitBeforeOut = () => {
      sendQuitGame && sendQuitGame();
    };
    window.addEventListener("beforeunload", sendQuitBeforeOut);
    return () => {
      window.removeEventListener("beforeunload", sendQuitBeforeOut);
    };
  }, [sendQuitGame]);

  // check competitor player joined room
  useEffect(() => {
    if (competitorRef.current !== competitor && competitor !== undefined) {
      competitorRef.current = competitor;
      sendJoinedGame && sendJoinedGame();
    } else {
      if (competitor === undefined) {
        competitorRef.current = competitor;
      }
    }
  }, [competitor]);

  useEffect(() => {
    if (
      [GameStatus.PENDING, GameStatus.COMPLETED].includes(status) &&
      allReady.length === 2
    ) {
      onReadyGame();
    }
    if ([GameStatus.RUNNING].includes(status) && allReady.length === 1) {
      endGame();
    }
    if ([GameStatus.READY].includes(status)) {
      if (allReady.length === 1) {
        resetGame();
      }
    }
  }, [allReady.length, status]);

  // Setup game
  useEffect(() => {
    if (status === GameStatus.PENDING) {
      // playFanfareSound && playFanfareSound();
      initGame(level);
    }
    return () => {
      // cleanup
    };
  }, [status]);

  // Check completed one level and re-start new one higher level
  useEffect(() => {
    if (checkCompletedLevel(pokemons)) {
      const levelUp: GameLevel = nextLevel[level];
      if (level === levelUp) {
        const newLevel = randomLevel();
        initGame(newLevel, GameStatus.RUNNING);
      } else {
        initGame(levelUp, GameStatus.RUNNING);
      }

      playCompletedGameSound && playCompletedGameSound();
    } else {
      const { foundConnectLine } = hasAnyConnectLine(
        pokemons,
        matrix,
        row,
        col
      );
      if (Object.keys(pokemons).length && foundConnectLine === false) {
        shuffleMatrix(pokemons);
        playLevelUpSound && playLevelUpSound();
      }
    }
  }, [pokemons]);

  return {
    initGame,
    resetGame,
    endGame,
    onReadyGame,
    startGame,
    matrix,
    row,
    col,
    status,
    level,
    currentPlayer,
  };
}
