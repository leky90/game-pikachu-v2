export enum GameSelector {
  SELECTED_POKEMONS_SELECTOR = "SELECTED_POKEMONS_SELECTOR",
}

export interface Pokemon {
  id: string;
  matched: boolean;
  nid?: string;
  image?: string;
}

export interface GameSound {
  soundReady: boolean;
  playOpenMenuSound: Function;
  playDisableSound: Function;
  playEnableSound: Function;
  playCompletedGameSound: Function;
  playFailedGameSound: Function;
  playBiteSound: Function;
  playOnSound: Function;
  playOffSound: Function;
  playGlugSound: Function;
  playFanfareSound: Function;
  playRisingPopSound: Function;
  playNearlyEndTimeSound: Function;
}

export enum GameTypeState {
  GAME_STATE = "GAME_STATE",
  GAME_SOUND_STATE = "GAME_SOUND_STATE",
  GAME_OVERLAY_STATE = "GAME_OVERLAY_STATE",
  SURVIVAL_MODE = "SURVIVAL_MODE",
  SPEED_MODE = "SPEED_MODE",
  SELECTED_POKEMONS = "SELECTED_POKEMONS",
}

export enum GameStatus {
  RUNNING = "RUNNING",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface GameState {
  status: GameStatus;
  row: number;
  col: number;
  pokemons: Record<string, Pokemon>;
  matrix: Pokemon[][];
}

export interface GameOverlayState {
  connectingLinePoints: PointCoords[];
}

export enum Direction {
  LEFT = "left",
  RIGHT = "right",
  TOP = "top",
  BOTTOM = "bottom",
}

export enum PointType {
  START = "start",
  END = "end",
  LINE = "line",
}

export interface PointCoords {
  rowIndex: number;
  colIndex: number;
  direction?: Direction;
  type?: PointType;
}

export interface PokemonCoords extends PointCoords {
  nid?: string;
}
