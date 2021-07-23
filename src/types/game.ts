import { PlayFunction } from "use-sound/dist/types";

export enum GameSelector {
  SELECTED_POKEMONS_SELECTOR = "SELECTED_POKEMONS_SELECTOR",
}

export interface PlayerState {
  rankingId?: string;
  playerName: string;
  playerTiming: number;
}

export interface Pokemon {
  id: string;
  matched: boolean;
  nid?: string;
  image?: string;
  rowIndex?: number;
  colIndex?: number;
}

export enum GameMode {
  SURVIVAL_MODE = "survival",
  SPEED_MODE = "speed",
}

export interface GameSound {
  soundReady: boolean;
  gameSongDuration: number;
  playOpenMenuSound?: PlayFunction;
  playDisableSound?: PlayFunction;
  playEnableSound?: PlayFunction;
  playCompletedGameSound?: PlayFunction;
  playFailedGameSound?: PlayFunction;
  playBiteSound?: PlayFunction;
  playOnSound?: PlayFunction;
  playOffSound?: PlayFunction;
  playGlugSound?: PlayFunction;
  playFanfareSound?: PlayFunction;
  playRisingPopSound?: PlayFunction;
  playNearlyEndTimeSound?: PlayFunction;
  playLevelUpSound?: PlayFunction;
  playPopUpOnSound?: PlayFunction;
  playPopUpOffSound?: PlayFunction;
  playPopDownSound?: PlayFunction;
  playYouWinSound?: PlayFunction;
  playGameSong?: PlayFunction;
}

export enum GameTypeState {
  PLAYER_STATE = "PLAYER_STATE",
  GAME_STATE = "GAME_STATE",
  GAME_SOUND_STATE = "GAME_SOUND_STATE",
  GAME_OVERLAY_STATE = "GAME_OVERLAY_STATE",
  SELECTED_POKEMONS = "SELECTED_POKEMONS",
}

export enum GameStatus {
  RUNNING = "running",
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
}

export interface GameState {
  status: GameStatus;
  row: number;
  col: number;
  pokemons: Record<string, Pokemon>;
  matrix: Pokemon[][];
  level: GameLevel;
}

export interface GameOverlayState {
  connectingLinePoints: PointCoords[];
  suggestPoints: [PointCoords | undefined, PointCoords | undefined];
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

export enum GameLevel {
  LEVEL_1 = "1",
  LEVEL_2 = "2",
  LEVEL_3 = "3",
  LEVEL_4 = "4",
  LEVEL_5 = "5",
  LEVEL_6 = "6",
  LEVEL_7 = "7",
  LEVEL_8 = "8",
  LEVEL_9 = "9",
  LEVEL_10 = "10",
  LEVEL_11 = "11",
  LEVEL_12 = "12",
  LEVEL_13 = "13",
  LEVEL_14 = "MAX",
}

export type GameOptions = {
  [key in GameLevel]: {
    row: number;
    col: number;
  };
};

export const gameOptions: GameOptions = {
  [GameLevel.LEVEL_1]: {
    row: 3,
    col: 4,
  },
  [GameLevel.LEVEL_2]: {
    row: 4,
    col: 4,
  },
  [GameLevel.LEVEL_3]: {
    row: 4,
    col: 5,
  },
  [GameLevel.LEVEL_4]: {
    row: 4,
    col: 6,
  },
  [GameLevel.LEVEL_5]: {
    row: 4,
    col: 7,
  },
  [GameLevel.LEVEL_6]: {
    row: 6,
    col: 8,
  },
  [GameLevel.LEVEL_7]: {
    row: 7,
    col: 8,
  },
  [GameLevel.LEVEL_8]: {
    row: 8,
    col: 8,
  },
  [GameLevel.LEVEL_9]: {
    row: 8,
    col: 9,
  },
  [GameLevel.LEVEL_10]: {
    row: 8,
    col: 10,
  },
  [GameLevel.LEVEL_11]: {
    row: 8,
    col: 11,
  },
  [GameLevel.LEVEL_12]: {
    row: 8,
    col: 12,
  },
  [GameLevel.LEVEL_13]: {
    row: 9,
    col: 12,
  },
  [GameLevel.LEVEL_14]: {
    row: 10,
    col: 12,
  },
};

export const nextLevel = {
  [GameLevel.LEVEL_1]: GameLevel.LEVEL_2,
  [GameLevel.LEVEL_2]: GameLevel.LEVEL_3,
  [GameLevel.LEVEL_3]: GameLevel.LEVEL_4,
  [GameLevel.LEVEL_4]: GameLevel.LEVEL_5,
  [GameLevel.LEVEL_5]: GameLevel.LEVEL_6,
  [GameLevel.LEVEL_6]: GameLevel.LEVEL_7,
  [GameLevel.LEVEL_7]: GameLevel.LEVEL_8,
  [GameLevel.LEVEL_8]: GameLevel.LEVEL_9,
  [GameLevel.LEVEL_9]: GameLevel.LEVEL_10,
  [GameLevel.LEVEL_10]: GameLevel.LEVEL_11,
  [GameLevel.LEVEL_11]: GameLevel.LEVEL_12,
  [GameLevel.LEVEL_12]: GameLevel.LEVEL_13,
  [GameLevel.LEVEL_13]: GameLevel.LEVEL_14,
  [GameLevel.LEVEL_14]: GameLevel.LEVEL_9,
};

export const BASE_START_TIME = 300;
export const SUGGEST_TIME = 10;
export const BONUS_TIME = 2;
export const PENALTY_TIME = 5;
export const PENDING_TIME = 3;
