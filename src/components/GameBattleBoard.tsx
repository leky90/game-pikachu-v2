import PokemonBattleRow from "./Game/PokemonBattleRow";
import useGameBattleEngine from "../hooks/useGameBattleEngine";
import { GameStatus } from "../types/game";

const GameBattleBoard = () => {
  const { matrix, row, col, status } = useGameBattleEngine();

  return (
    <div className={`game-pokemon board-${row}x${col}`}>
      {status === GameStatus.RUNNING &&
        matrix &&
        matrix.map((pokemons, index) => (
          <PokemonBattleRow
            key={`row-${index}`}
            rowIndex={index}
            pokemons={pokemons}
            status={status}
          />
        ))}
    </div>
  );
};

export default GameBattleBoard;
