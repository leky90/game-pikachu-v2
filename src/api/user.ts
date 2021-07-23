import { Response } from "../hooks/useAsync";
import BASE_API from "./CONSTANTS";

export interface ActivePlayersResponse extends Response {
  data: string[];
}

const getActivePlayers = (): Promise<ActivePlayersResponse> => {
  return fetch(`${BASE_API}/users`)
    .then((res) => res.json())
    .then(
      (response) => response,
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => error
    );
};

export { getActivePlayers };
