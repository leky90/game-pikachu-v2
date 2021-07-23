import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { useGameActions } from "../../hooks/useGameActions";
import selectedPokemonsState from "../../recoil/atoms/selectedPokemonsState";

import { GameMode, GameStatus, Pokemon } from "../../types/game";
import PokemonCard from "./PokemonCard";

type PokemonRowProps = {
  pokemons: Pokemon[];
  rowIndex: number;
  mode: GameMode;
  status: GameStatus;
};

const PokemonRow: FC<PokemonRowProps> = ({
  pokemons,
  rowIndex,
  mode,
  status,
}) => {
  const selectedPokemons = useRecoilValue(selectedPokemonsState);
  const { selectPokemon } = useGameActions(mode);
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
          status={status}
        />
      ))}
    </>
  );
};

export default PokemonRow;
