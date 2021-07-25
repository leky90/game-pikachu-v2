import { Response } from "../hooks/useAsync";
import BASE_API from "./CONSTANTS";
import { ActivePlayersResponse } from "./user";

export interface ActiveGamesResponse extends Response {
  data: string[];
}

const getActiveGames = (): Promise<ActiveGamesResponse> => {
  return fetch(`${BASE_API}/games`)
    .then((res) => res.json())
    .then(
      (response) => response,
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => error
    );
};

const getPlayersInGame = (gameId: string): Promise<ActivePlayersResponse> => {
  return fetch(`${BASE_API}/game/${gameId}`)
    .then((res) => res.json())
    .then(
      (response) => response,
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => error
    );
};

export { getActiveGames, getPlayersInGame };
