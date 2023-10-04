import React from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import NavStyle from "./HighScoreBoard.module.css";

export interface highScoresProps {
  id: number;
  playerName: string;
  totalAttempts: number;
  clearTime: number;
  totalScore: number;
}

export const fetchHighScores = async () => {
  try {
    const response = await axios.get(
      "https://localhost:7112/api/HighScore/GetTop5HighScores"
    );
    return response.data as highScoresProps[];
  } catch (error) {
    console.error("Error fetching high scores:", error);
    throw error;
  }
};

const HighScoreBoard = () => {
  const highScores = useLoaderData() as highScoresProps[];
  const skipIndex0 = 1;
  return (
    <div className={NavStyle.div4}>
      <table>
        <thead>
          <tr>
            <th>
              <h2>Place</h2>
            </th>
            <th>
              <h2>Player</h2>
            </th>
            <th>
              <h2>Score</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          {highScores.map((score, index) => (
            <tr key={score.id}>
              <td>{index + skipIndex0}</td>
              <td>{score.playerName}</td>
              <td>{score.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HighScoreBoard;
