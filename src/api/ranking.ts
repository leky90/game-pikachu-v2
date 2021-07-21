import { Response } from "../hooks/useAsync";
import { GameMode } from "../types/game";
import BASE_API from "./CONSTANTS";

export type TopPlayer = {
  _id?: string;
  timing?: number;
  playerName: string;
  mode: GameMode;
  timestamp: number;
};

export interface TopPlayersResponse extends Response {
  data: TopPlayer[];
}

export interface InsertedTopPlayerResponse extends Response {
  data?: {
    InsertedID: string;
  };
  id: string;
}

const defaultFetchOptions: RequestInit = {
  method: "POST", // *GET, POST, PUT, DELETE, etc.
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, *same-origin, omit
  headers: {
    "Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: "follow", // manual, *follow, error
  referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
};

const getTopRanking = (mode: GameMode): Promise<TopPlayersResponse> => {
  return fetch(`${BASE_API}/rankings?mode=${mode}`)
    .then((res) => res.json())
    .then(
      (response) => response,
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => error
    );
};

const addNewRanking = (data: TopPlayer): Promise<InsertedTopPlayerResponse> => {
  const fetchOptions = { ...defaultFetchOptions, body: JSON.stringify(data) };
  return fetch(`${BASE_API}/rankings`, fetchOptions)
    .then((res) => res.json())
    .then(
      (response) => response,
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => error
    );
};

const updateNewRanking = (
  id: string,
  data: TopPlayer
): Promise<InsertedTopPlayerResponse> => {
  const fetchOptions = {
    ...defaultFetchOptions,
    method: "PUT",
    body: JSON.stringify(data),
  };
  return fetch(`${BASE_API}/rankings/${id}`, fetchOptions)
    .then((res) => res.json())
    .then(
      (response) => response,
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => error
    );
};

export { getTopRanking, addNewRanking, updateNewRanking };
