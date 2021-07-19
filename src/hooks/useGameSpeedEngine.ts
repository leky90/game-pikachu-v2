import { useCallback, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import gameState from "../recoil/atoms/gameState";
import { GameStatus } from "../types/game";
import { generatePokemonMatrix, makeListPokemons } from "../utils/game";

export default function useGameSpeedEngine() {
  const setGame = useSetRecoilState(gameState);
  const { matrix, row, col, status } = useRecoilValue(gameState);

  const initGame = useCallback(
    (row: number, col: number) => {
      const pokemons = makeListPokemons(row, col);
      const matrix = generatePokemonMatrix(pokemons, row, col);
      setGame((gameState) => ({
        ...gameState,
        pokemons,
        matrix,
        status: GameStatus.RUNNING,
      }));
    },
    [setGame]
  );

  useEffect(() => {
    if (status === GameStatus.PENDING) {
      initGame(row, col);
    }
    return () => {
      // cleanup
    };
  }, [row, col, status, initGame]);

  return {
    initGame,
    matrix,
    row,
    col,
    status,
  };
}
