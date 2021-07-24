import { FC, memo } from "react";
import { GameStatus, Pokemon } from "../../types/game";

type PokemonCardProps = {
  pokemon: Pokemon;
  rowIndex: number;
  colIndex: number;
  isSelected: number | boolean;
  status: GameStatus;
  selectPokemon: (
    pokemonId: string,
    rowIndex: number,
    colIndex: number
  ) => void;
};

const PokemonCard: FC<PokemonCardProps> = ({
  pokemon,
  rowIndex,
  colIndex,
  isSelected,
  status,
  selectPokemon,
}) => {
  const selected = isSelected ? "selected" : "";
  const hidden = pokemon.matched ? "hidden" : "";
  return (
    <div
      style={{
        backgroundImage: `url(${pokemon.image ?? ""})`,
      }}
      className={`pokemon-card ${selected} ${hidden}`}
      onClick={() => {
        if (
          !isSelected &&
          !pokemon.matched &&
          status === GameStatus.RUNNING &&
          pokemon.nid
        ) {
          selectPokemon(pokemon.nid, rowIndex, colIndex);
        }
      }}
    />
  );
};

function propsAreEquals(
  prevProps: PokemonCardProps,
  nextProps: PokemonCardProps
) {
  return (
    prevProps.pokemon.nid === nextProps.pokemon.nid &&
    prevProps.pokemon.image === nextProps.pokemon.image &&
    prevProps.pokemon.matched === nextProps.pokemon.matched &&
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.status === nextProps.status
  );
}

export default memo(PokemonCard, propsAreEquals);
