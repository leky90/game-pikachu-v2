import { FC } from "react";
import { useRecoilValue } from "recoil";
import { useGameBattleActions } from "../../hooks/useGameBattleActions";
import selectedPokemonsState from "../../recoil/atoms/selectedPokemonsState";
import { GameStatus, Pokemon } from "../../types/game";
import PokemonBattleCard from "./PokemonBattleCard";

type PokemonBattleRowProps = {
  pokemons: Pokemon[];
  rowIndex: number;
  status: GameStatus;
};

const PokemonBattleRow: FC<PokemonBattleRowProps> = ({
  pokemons,
  rowIndex,
  status,
}) => {
  const selectedPokemons = useRecoilValue(selectedPokemonsState);
  const { selectBattlePokemon } = useGameBattleActions();
  return (
    <>
      {pokemons.map((pokemon, index) => (
        <PokemonBattleCard
          key={`card-${index}`}
          pokemon={pokemon}
          rowIndex={rowIndex}
          colIndex={index}
          isSelected={
            pokemon.nid !== undefined &&
            selectedPokemons.findIndex(({ nid }) => nid === pokemon.nid) >= 0
          }
          selectPokemon={selectBattlePokemon}
          status={status}
        />
      ))}
    </>
  );
};

export default PokemonBattleRow;
