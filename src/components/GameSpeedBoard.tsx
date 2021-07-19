import PokemonRow from "./Game/PokemonRow";
import useGameSpeedEngine from "../hooks/useGameSpeedEngine";

const GameSpeedBoard = () => {
  const { matrix, row, col } = useGameSpeedEngine();

  return (
    <div className={`game-pokemon board-${row}x${col}`}>
      {matrix &&
        matrix.map((pokemons, index) => (
          <PokemonRow
            key={`row-${index}`}
            rowIndex={index}
            pokemons={pokemons}
          />
        ))}
    </div>
  );
};

export default GameSpeedBoard;
