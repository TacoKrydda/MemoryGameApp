import React from "react";
import { Link } from "react-router-dom";

const Game = () => {
  return (
    <div className="div3">
      <h1>Select level</h1>
      <Link to="/level1">
        <p>Level 1</p>
      </Link>
    </div>
  );
};

export default Game;
