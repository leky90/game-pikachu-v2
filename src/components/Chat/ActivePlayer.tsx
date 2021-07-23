import { FC, memo } from "react";

interface ActivePlayer {
  playerName: string;
}

const ActivePlayer: FC<ActivePlayer> = ({ playerName }) => {
  return (
    <li className="active-player">
      <strong>{playerName.replace(/-.*$/g, "")}</strong>
      <small>
        <em>ID: {playerName.replace(/^.*-/g, "")}</em>
      </small>
    </li>
  );
};

function areSameProps(prevProps: ActivePlayer, nextProps: ActivePlayer) {
  return prevProps.playerName === nextProps.playerName;
}

export default memo(ActivePlayer, areSameProps);
