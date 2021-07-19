import { FC } from "react";
import { useRecoilValue } from "recoil";
import { useGameSpeedActions } from "../../hooks/useGameSpeedActions";
import selectedPokemonsState from "../../recoil/atoms/selectedPokemonsState";

import { Pokemon } from "../../types/game";
import PokemonCard from "./PokemonCard";

type PokemonRowProps = {
  pokemons: Pokemon[];
  rowIndex: number;
};

const PokemonRow: FC<PokemonRowProps> = ({ pokemons, rowIndex }) => {
  const selectedPokemons = useRecoilValue(selectedPokemonsState);
  const { selectPokemon } = useGameSpeedActions();
  return (
    <>
      {pokemons.map((pokemon, index) => (
        <PokemonCard
          key={`card-${index}`}
          pokemon={pokemon}
          rowIndex={rowIndex}
          colIndex={index}
          isSelected={
            pokemon.nid !== undefined &&
            selectedPokemons.findIndex(({ nid }) => nid === pokemon.nid) >= 0
          }
          selectPokemon={selectPokemon}
        />
      ))}
    </>
  );
};

export default PokemonRow;
