import React from "react";
import { Link } from "react-router-dom";
import style from "./Game.module.css";
import { highScoresProps } from "../HighScore/HighScoreBoard";

const Game = () => {
  return (
    <div className={style.game}>
      <h1>Select level</h1>
      <Link to="/level1">
        <p>Level 1</p>
      </Link>
    </div>
  );
};

export default Game;
