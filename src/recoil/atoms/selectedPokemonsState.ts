import { atom } from "recoil";
import { GameTypeState, PokemonCoords } from "../../types/game";

const selectedPokemonsState = atom<PokemonCoords[]>({
  key: GameTypeState.SELECTED_POKEMONS,
  default: [],
});

export default selectedPokemonsState;
