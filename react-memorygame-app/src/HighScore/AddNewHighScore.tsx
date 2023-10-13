import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { CalculateScore } from "./Calculate";

interface HighScoreProps {
  id: number;
  playername: string;
  totalscore: number;
  cleartime: number;
  totalattempts: number;
}

const AddNewHighScore = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [playerName, setPlayerName] = useState("");
  const { attempt, timer } = location.state;
  const [highScore, setScore] = useState(0);
  const [newScore, setNewScore] = useState<Partial<HighScoreProps>>({});
  const [clear, setClear] = useState(false);

  useEffect(() => {
    const getScore = async () => {
      const result = await CalculateScore(attempt, timer);
      setScore(result);
    };
    getScore();
  }, []);

  useEffect(() => {
    if (clear) {
      console.log(playerName, attempt, timer, highScore);
      addHighScore(newScore);
    }
  }, [clear]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };

  const addHighScore = async (newHighScore: Partial<HighScoreProps>) => {
    try {
      await axios.post(
        "https://localhost:7112/api/HighScore/AddHighScore",
        newHighScore
      );
      // Refresh the high scores after adding a new score
      navigate("/highscoreboard");
    } catch (error) {
      console.error("Error adding high score:", error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setNewScore({
      ...newScore,
      playername: playerName,
      totalattempts: attempt,
      cleartime: timer,
      totalscore: highScore,
    });
    setClear(true);
  };
  console.log(newScore);

  return (
    <div>
      <div>
        <h2>Score: </h2>
        <h2>Name: {playerName}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <h2>Add Your Player Name</h2>
            <input type="text" value={playerName} onChange={handleNameChange} />
          </label>
          <button type="submit">
            <h3>Submit</h3>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewHighScore;
