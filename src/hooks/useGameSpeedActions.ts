import { useResetRecoilState, useSetRecoilState } from "recoil";
import gameState from "../recoil/atoms/gameState";
import selectedPokemonsSelector from "../recoil/selectors/selectedPokemonsSelector";
import selectedPokemonsState from "../recoil/atoms/selectedPokemonsState";
import gameOverlayState from "../recoil/atoms/gameOverlayState";

export function useGameSpeedActions() {
  const setSelectedPokemons = useSetRecoilState(selectedPokemonsSelector);
  const resetGameState = useResetRecoilState(gameState);
  const resetGameOverlayState = useResetRecoilState(gameOverlayState);
  const resetSelectedPokemonsState = useResetRecoilState(selectedPokemonsState);

  const selectPokemon = (
    pokemonId: string,
    rowIndex: number,
    colIndex: number
  ) => {
    setSelectedPokemons({ nid: pokemonId, rowIndex, colIndex });
  };

  const resetGame = () => {
    resetGameState();
    resetGameOverlayState();
    resetSelectedPokemonsState();
  };

  return {
    selectPokemon,
    resetGame,
  };
}
