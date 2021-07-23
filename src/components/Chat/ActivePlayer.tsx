import { FC } from "react";

const ActivePlayer: FC<{ playerName: string }> = ({ playerName }) => {
  return (
    <li className="active-player">
      <strong>{playerName.replace(/-.*$/g, "")}</strong>
      <small>
        <em>ID: {playerName.replace(/^.*-/g, "")}</em>
      </small>
    </li>
  );
};

export default ActivePlayer;
