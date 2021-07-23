import { selector } from "recoil";
import { GameSelector, PokemonCoords } from "../../types/game";
import { checkConnectionSelectedPokemons } from "../../utils/game";
import gameState from "../atoms/gameState";
import gameOverlayState from "../atoms/gameOverlayState";
import selectedPokemonsState from "../atoms/selectedPokemonsState";

const selectedPokemonsSelector = selector({
  key: GameSelector.SELECTED_POKEMONS_SELECTOR,
  get: ({ get }) => {
    const selectedPokemons = get(selectedPokemonsState);
    return selectedPokemons;
  },
  set: ({ set, get }, newValue) => {
    const { row, col, status, matrix, pokemons, level } = get(gameState);
    const selectedPokemons = get(selectedPokemonsState);

    const cloneSelectedPokemons = [...selectedPokemons];
    cloneSelectedPokemons.push(newValue as PokemonCoords);

    const {
      connectingLinePoints,
      newMatrix,
      newPokemons,
      newSelectedPokemons,
    } = checkConnectionSelectedPokemons(
      cloneSelectedPokemons,
      pokemons,
      matrix,
      row,
      col
    );

    if (connectingLinePoints.length >= 1) {
      if (connectingLinePoints.length > 1) {
        set(gameState, {
          row,
          col,
          status,
          level,
          matrix: newMatrix,
          pokemons: newPokemons,
        });
      }
      set(gameOverlayState, {
        suggestPoints: [undefined, undefined],
        connectingLinePoints,
      });
    }

    set(selectedPokemonsState, newSelectedPokemons);
  },
});

export default selectedPokemonsSelector;
