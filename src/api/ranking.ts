import { Response } from "../hooks/useAsync";
import { GameMode } from "../types/game";
import BASE_API from "./CONSTANTS";

export type TopPlayer = {
  id?: string;
  playerName: string;
  timing: number;
  mode: GameMode;
  timestamp: number;
};

export interface TopPlayersResponse extends Response {
  data: TopPlayer[];
}

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

const addNewRanking = (data: TopPlayer): Promise<TopPlayersResponse> => {
  return fetch(`${BASE_API}/rankings`, {
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
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then((res) => res.json())
    .then(
      (response) => response,
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => error
    );
};

export { getTopRanking, addNewRanking };
