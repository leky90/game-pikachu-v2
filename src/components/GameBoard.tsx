import PokemonRow from "./Game/PokemonRow";
import useGameEngine from "../hooks/useGameEngine";
import { GameMode } from "../types/game";
import { FC } from "react";

const GameBoard: FC<{ mode: GameMode }> = ({ mode }) => {
  const { matrix, row, col, status } = useGameEngine(mode);

  return (
    <div className={`game-pokemon board-${row}x${col}`}>
      {matrix &&
        matrix.map((pokemons, index) => (
          <PokemonRow
            mode={mode}
            key={`row-${index}`}
            rowIndex={index}
            pokemons={pokemons}
            status={status}
          />
        ))}
    </div>
  );
};

export default GameBoard;
