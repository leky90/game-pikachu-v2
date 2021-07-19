import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import gameState from "../recoil/atoms/gameState";
import { generatePokemonMatrix, makeListPokemons } from "../utils/game";

export function useGameSurvivalActions() {
  const { row, col, matrix } = useRecoilValue(gameState);
  const [game, setGame] = useRecoilState(gameState);
  const initGame = () => {
    const pokemons = makeListPokemons(row, col);
    const { pokemonMatrix, pokemons: newPokemons } = generatePokemonMatrix(
      pokemons,
      row,
      col
    );
    setGame({ ...game, matrix: pokemonMatrix, pokemons: newPokemons });
  };

  useEffect(() => {
    initGame();
    return () => {
      // cleanup
    };
  }, []);

  return {
    matrix,
    row,
    col,
  };
}
