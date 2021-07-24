import { FC, memo } from "react";
import { getPlayerID, getPlayerName } from "../../utils/game";

interface ActivePlayer {
  player: string;
}

const ActivePlayer: FC<ActivePlayer> = ({ player }) => {
  return (
    <li className="active-player">
      <strong>{getPlayerName(player)}</strong>
      <small>
        <em>ID: {getPlayerID(player)}</em>
      </small>
    </li>
  );
};

function areSameProps(prevProps: ActivePlayer, nextProps: ActivePlayer) {
  return prevProps.player === nextProps.player;
}

export default memo(ActivePlayer, areSameProps);
