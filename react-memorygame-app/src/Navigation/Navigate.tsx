import React from "react";
import { Link } from "react-router-dom";
import navStyles from "./Navigate.module.css";

const Navigation = () => {
  return (
    <div className={navStyles.navigateContainer}>
      <Link to="/">
        <h1>Home</h1>
      </Link>

      <Link to="/game">
        <h1>Game</h1>
      </Link>

      <Link to="/highscoreboard">
        <h1>HighScore</h1>
      </Link>
    </div>
  );
};

export default Navigation;
