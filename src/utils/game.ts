import { nanoid } from "nanoid";
import {
  PointCoords,
  Pokemon,
  PokemonCoords,
  Direction,
  PointType,
} from "../types/game";

const BASE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white";

export let pokemonList: Pokemon[] = [
  { id: "poke-0", matched: false, image: `${BASE_URL}/1.png` },
  { id: "poke-1", matched: false, image: `${BASE_URL}/2.png` },
  { id: "poke-2", matched: false, image: `${BASE_URL}/3.png` },
  { id: "poke-3", matched: false, image: `${BASE_URL}/4.png` },
  { id: "poke-5", matched: false, image: `${BASE_URL}/5.png` },
  { id: "poke-4", matched: false, image: `${BASE_URL}/6.png` },
  { id: "poke-6", matched: false, image: `${BASE_URL}/7.png` },
  { id: "poke-7", matched: false, image: `${BASE_URL}/8.png` },
  { id: "poke-8", matched: false, image: `${BASE_URL}/9.png` },
  { id: "poke-9", matched: false, image: `${BASE_URL}/10.png` },
  { id: "poke-10", matched: false, image: `${BASE_URL}/11.png` },
  { id: "poke-11", matched: false, image: `${BASE_URL}/12.png` },
  { id: "poke-12", matched: false, image: `${BASE_URL}/13.png` },
  { id: "poke-13", matched: false, image: `${BASE_URL}/14.png` },
  { id: "poke-14", matched: false, image: `${BASE_URL}/15.png` },
  { id: "poke-15", matched: false, image: `${BASE_URL}/16.png` },
  { id: "poke-16", matched: false, image: `${BASE_URL}/17.png` },
  { id: "poke-17", matched: false, image: `${BASE_URL}/18.png` },
  { id: "poke-18", matched: false, image: `${BASE_URL}/19.png` },
  { id: "poke-19", matched: false, image: `${BASE_URL}/20.png` },
  { id: "poke-20", matched: false, image: `${BASE_URL}/21.png` },
  { id: "poke-21", matched: false, image: `${BASE_URL}/22.png` },
  { id: "poke-22", matched: false, image: `${BASE_URL}/23.png` },
  { id: "poke-23", matched: false, image: `${BASE_URL}/24.png` },
  { id: "poke-24", matched: false, image: `${BASE_URL}/25.png` },
  { id: "poke-25", matched: false, image: `${BASE_URL}/26.png` },
  { id: "poke-26", matched: false, image: `${BASE_URL}/27.png` },
  { id: "poke-27", matched: false, image: `${BASE_URL}/28.png` },
  { id: "poke-28", matched: false, image: `${BASE_URL}/29.png` },
  { id: "poke-29", matched: false, image: `${BASE_URL}/30.png` },
  { id: "poke-30", matched: false, image: `${BASE_URL}/31.png` },
  { id: "poke-31", matched: false, image: `${BASE_URL}/32.png` },
  { id: "poke-32", matched: false, image: `${BASE_URL}/33.png` },
  { id: "poke-33", matched: false, image: `${BASE_URL}/34.png` },
  { id: "poke-34", matched: false, image: `${BASE_URL}/35.png` },
  { id: "poke-35", matched: false, image: `${BASE_URL}/36.png` },
  { id: "poke-36", matched: false, image: `${BASE_URL}/37.png` },
  { id: "poke-37", matched: false, image: `${BASE_URL}/38.png` },
  { id: "poke-38", matched: false, image: `${BASE_URL}/39.png` },
  { id: "poke-39", matched: false, image: `${BASE_URL}/40.png` },
];

const convertObjectToArrayList = <Model>(
  objectList: Record<string, Model>
): Model[] => {
  const arrayList: Model[] = [];
  Object.keys(objectList).map((key) => {
    arrayList.push(objectList[key]);
    return key;
  });
  return arrayList;
};

export const shufflePokemonList = (nonShuffleList: Pokemon[]) => {
  const shuffledPokemonList = nonShuffleList.sort(() => Math.random() - 0.5);
  const shuffledlistPokemon: Record<string, Pokemon> = {};
  shuffledPokemonList.map((pokemon) => {
    const nid = nanoid();
    shuffledlistPokemon[nid] = pokemon;
    return pokemon;
  });

  return shuffledlistPokemon;
};

export const reShufflePokemonList = (pokemonList: Record<string, Pokemon>) => {
  const arrayPokemons = convertObjectToArrayList(pokemonList);

  return shufflePokemonList(arrayPokemons);
};

export const makeListPokemons = (row: number, col: number) => {
  const clonePokemonList: Pokemon[] = pokemonList.sort(
    () => Math.random() - 0.5
  );
  // pokemonList.map((pokemon) => {
  //   clonePokemonList.push(pokemon);
  //   return pokemon;
  // });
  const total = (row * col) / 4;
  const slicePokemonList = clonePokemonList.slice(0, total);
  const nonShufflePokemonList = [
    ...slicePokemonList,
    ...slicePokemonList,
    ...slicePokemonList,
    ...slicePokemonList,
  ];

  return shufflePokemonList(nonShufflePokemonList);
};

export const generatePokemonMatrix = (
  pokemons: Record<string, Pokemon>,
  rowSetting: number = 8,
  colSetting: number = 10
): { pokemonMatrix: Pokemon[][]; pokemons: Record<string, Pokemon> } => {
  const newPokemons = { ...pokemons };
  const totalCol = colSetting + 2;
  const totalRow = rowSetting + 2;
  const pokemonKeys = Object.keys(pokemons);
  const pokemonMatrix: Pokemon[][] = [];

  for (let row = 0; row < totalRow; row++) {
    if (pokemonMatrix[row] === undefined) pokemonMatrix[row] = [];
    for (let col = 0; col < totalCol; col++) {
      if (
        row === 0 ||
        row === totalRow - 1 ||
        col === 0 ||
        col === totalCol - 1
      ) {
        const id = nanoid();
        const borderPoint = { nid: id, id, matched: true };
        pokemonMatrix[row].push(borderPoint);
      } else {
        const pokemonKey = pokemonKeys.pop();
        if (pokemonKey) {
          const pokemon = {
            ...newPokemons[pokemonKey],
            nid: pokemonKey,
            row,
            col,
          };
          newPokemons[pokemonKey] = {
            ...newPokemons[pokemonKey],
            rowIndex: row,
            colIndex: col,
          };
          pokemonMatrix[row].push(pokemon);
        }
      }
    }
  }

  return { pokemonMatrix, pokemons: newPokemons };
};

const cloneMatrix = (matrix: Pokemon[][]) => {
  const newMatrix = [];
  const length = matrix.length;

  for (let i = 0; i < length; i++) {
    newMatrix[i] = matrix[i].slice();
  }

  return newMatrix;
};

export const findPath = (
  fromPoint: PointCoords,
  toPoint: PointCoords,
  matrix: Pokemon[][],
  totalRow: number,
  totalCol: number
) => {
  const matrixTotalRow = totalRow + 2;
  const matrixTotalCol = totalCol + 2;
  const tempMatrix = cloneMatrix(matrix);
  const matrixPoints: boolean[][] = [];
  const matrixTrackingPoints: (PointCoords | undefined)[][] = [];

  for (let rowIndex = 0; rowIndex < matrixTotalRow; ++rowIndex) {
    matrixPoints.push([]);
    matrixTrackingPoints.push([]);
    for (let colIndex = 0; colIndex < matrixTotalCol; ++colIndex) {
      const pokemon = { ...tempMatrix[rowIndex][colIndex] };
      matrixPoints[rowIndex].push(pokemon.matched);
      matrixTrackingPoints[rowIndex].push(undefined);
    }
  }
  const dRow: number[] = [-1, 0, 1, 0];
  const dCol: number[] = [0, 1, 0, -1];
  const queue = [];
  queue.push(toPoint);
  matrixTrackingPoints[toPoint.rowIndex][toPoint.colIndex] = {
    rowIndex: -2,
    colIndex: -2,
  };

  matrixPoints[fromPoint.rowIndex][fromPoint.colIndex] = true;
  matrixPoints[toPoint.rowIndex][toPoint.colIndex] = true;

  while (queue.length) {
    const currentPoint = queue.shift();

    if (currentPoint) {
      if (
        currentPoint?.rowIndex === fromPoint.rowIndex &&
        currentPoint?.colIndex === fromPoint.colIndex
      ) {
        break;
      }
      for (let index = 0; index < 4; index++) {
        let rowIndex: number = currentPoint.rowIndex + dRow[index];
        let colIndex: number = currentPoint.colIndex + dCol[index];
        while (
          rowIndex >= 0 &&
          rowIndex < matrixTotalRow &&
          colIndex >= 0 &&
          colIndex < matrixTotalCol &&
          matrixPoints[rowIndex][colIndex] === true
        ) {
          if (matrixTrackingPoints[rowIndex][colIndex] === undefined) {
            matrixTrackingPoints[rowIndex][colIndex] = currentPoint;
            queue.push({ rowIndex, colIndex });
          }
          rowIndex += dRow[index];
          colIndex += dCol[index];
        }
      }
    }
  }

  const trackedPoints: PointCoords[] = [];
  let trackPoint: PointCoords = { ...fromPoint };

  if (matrixTrackingPoints[trackPoint.rowIndex][trackPoint.colIndex]) {
    while (trackPoint.rowIndex !== -2 && trackPoint.colIndex !== -2) {
      trackedPoints.push({
        rowIndex: trackPoint.rowIndex,
        colIndex: trackPoint.colIndex,
      });
      trackPoint = {
        ...(matrixTrackingPoints[trackPoint.rowIndex][
          trackPoint.colIndex
        ] as PointCoords),
      };
    }
  }

  return trackedPoints;
};

export const hasConnectLine = (
  point1: PokemonCoords,
  point2: PokemonCoords,
  matrix: Pokemon[][],
  totalRow: number,
  totalCol: number
) => {
  const pathPoints = findPath(point1, point2, matrix, totalRow, totalCol);

  return {
    connected: pathPoints.length >= 2 && pathPoints.length <= 4,
    pathPoints,
  };
};

export const checkPointInLine = (
  connectingLinePoints: PointCoords[],
  currentPosition: PointCoords
) => {
  const { rowIndex, colIndex } = currentPosition;

  return connectingLinePoints.find(
    (matchingLinePoint) =>
      matchingLinePoint.rowIndex === rowIndex &&
      matchingLinePoint.colIndex === colIndex
  );
};

export const drawPath = (
  pathPoints: PointCoords[],
  totalRow: number,
  totalCol: number
) => {
  const limitRow = totalRow + 2;
  const limitCol = totalCol + 2;
  // console.log(pathPoints);
  return pathPoints.reduce(
    (newPathPoints, currentPoint, index, arrayPoints) => {
      let type: PointType = PointType.LINE;
      let direction: Direction | undefined = undefined;
      const nextIndex = index + 1;
      const prevIndex = index - 1;

      if (arrayPoints[nextIndex] === undefined) {
        type = PointType.END;
      }

      if (arrayPoints[prevIndex]) {
        const prevPoint = arrayPoints[prevIndex];
        if (prevPoint.rowIndex > currentPoint.rowIndex) {
          direction = Direction.TOP;
        } else if (prevPoint.rowIndex < currentPoint.rowIndex) {
          direction = Direction.BOTTOM;
        } else {
          if (prevPoint.colIndex > currentPoint.colIndex) {
            direction = Direction.LEFT;
          } else if (prevPoint.colIndex < currentPoint.colIndex) {
            direction = Direction.RIGHT;
          } else {
            if (prevPoint.rowIndex > currentPoint.rowIndex) {
              direction = Direction.TOP;
            } else if (prevPoint.rowIndex < currentPoint.rowIndex) {
              direction = Direction.BOTTOM;
            }
          }
        }

        let extraPoint: PointCoords | undefined = {
          ...currentPoint,
          direction,
          type: PointType.LINE,
        };

        // console.log(extraPoint);

        do {
          switch (extraPoint.direction) {
            case Direction.BOTTOM:
              extraPoint.rowIndex--;
              if (extraPoint.rowIndex < 0) {
                extraPoint = undefined;
              }

              break;

            case Direction.TOP:
              extraPoint.rowIndex++;
              if (extraPoint.rowIndex >= limitRow) {
                extraPoint = undefined;
              }
              break;

            case Direction.LEFT:
              extraPoint.colIndex++;
              if (extraPoint.colIndex >= limitCol) {
                extraPoint = undefined;
              }
              break;

            case Direction.RIGHT:
              extraPoint.colIndex--;
              if (extraPoint.colIndex < 0) {
                extraPoint = undefined;
              }
              break;

            default:
              break;
          }
          if (extraPoint === undefined) {
            break;
          }
          if (
            extraPoint.rowIndex === prevPoint.rowIndex &&
            extraPoint.colIndex === prevPoint.colIndex
          ) {
            break;
          }

          newPathPoints.push({ ...extraPoint });
        } while (extraPoint !== undefined);
      } else {
        type = PointType.START;
      }
      const newCurrentPoint = { ...currentPoint, direction, type };

      newPathPoints.push(newCurrentPoint);

      return newPathPoints;
    },
    [] as PointCoords[]
  );
};

export const checkConnectionSelectedPokemons = (
  selectedPokemons: PokemonCoords[],
  pokemons: Record<string, Pokemon>,
  matrix: Pokemon[][],
  rowSetting: number,
  colSetting: number
) => {
  const newPokemons = { ...pokemons };
  const newSelectedPokemons = [...selectedPokemons];
  const [selectedPokemon1, selectedPokemon2] = newSelectedPokemons;
  let connectingLinePoints: PointCoords[] = [];
  let newMatrix = [...matrix];

  if (
    selectedPokemon1?.nid &&
    selectedPokemon2?.nid &&
    pokemons[selectedPokemon1.nid].id === pokemons[selectedPokemon2.nid].id
  ) {
    const { connected, pathPoints } = hasConnectLine(
      selectedPokemon1,
      selectedPokemon2,
      matrix,
      rowSetting,
      colSetting
    );

    if (connected) {
      connectingLinePoints = drawPath(pathPoints, rowSetting, colSetting);

      newPokemons[selectedPokemon1.nid] = {
        ...newPokemons[selectedPokemon1.nid],
        matched: true,
      };
      newPokemons[selectedPokemon2.nid] = {
        ...newPokemons[selectedPokemon2.nid],
        matched: true,
      };
      const { pokemonMatrix } = generatePokemonMatrix(
        newPokemons,
        rowSetting,
        colSetting
      );
      newMatrix = pokemonMatrix;
    } else {
      connectingLinePoints = [{ rowIndex: -1, colIndex: -1 }];
    }

    newSelectedPokemons.length = 0;
  } else {
    if (selectedPokemons.length === 2) {
      newSelectedPokemons.length = 0;
      connectingLinePoints = [{ rowIndex: -1, colIndex: -1 }];
    }
  }

  return {
    newSelectedPokemons,
    newMatrix,
    newPokemons,
    connectingLinePoints,
  };
};

export const checkCompletedLevel = (pokemons: Record<string, Pokemon>) => {
  return (
    Object.keys(pokemons).length &&
    Object.entries(pokemons).findIndex(
      ([_, pokemon]) => pokemon.matched === false
    ) === -1
  );
};

export const hasAnyConnectLine = (
  pokemons: Record<string, Pokemon>,
  matrix: Pokemon[][],
  totalRow: number,
  totalCol: number
) => {
  let foundConnectLine = false;
  let fromPoint: PointCoords | undefined = undefined;
  let toPoint: PointCoords | undefined = undefined;
  const entriesPokemons = Object.entries(pokemons);

  while (entriesPokemons.length) {
    const entryPokemon = entriesPokemons.pop();

    if (entryPokemon === undefined) {
      break;
    }
    const [nid, currentPokemon] = entryPokemon;

    if (currentPokemon.matched === false) {
      foundConnectLine = entriesPokemons.some(([nid, pokemon]) => {
        if (currentPokemon.id === pokemon.id && pokemon.matched === false) {
          const { connected } = hasConnectLine(
            currentPokemon as PointCoords,
            pokemon as PointCoords,
            matrix,
            totalRow,
            totalCol
          );

          if (connected) {
            if (currentPokemon.rowIndex && currentPokemon.colIndex) {
              fromPoint = {
                rowIndex: currentPokemon.rowIndex,
                colIndex: currentPokemon.colIndex,
              };
            }
            if (pokemon.rowIndex && pokemon.colIndex) {
              toPoint = {
                rowIndex: pokemon.rowIndex,
                colIndex: pokemon.colIndex,
              };
            }
          }

          return connected;
        }

        return false;
      });
      if (foundConnectLine) {
        break;
      }
    }
  }

  return { foundConnectLine, fromPoint, toPoint };
};
