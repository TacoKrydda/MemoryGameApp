import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import EndMessage from "./EndMessage";
import gameStyle from "./Game.module.css";

export const fetchGameNumberSize = async () => {
  try {
    const response = await axios.get(
      "https://localhost:7112/api/HighScore/GenerateRandomNumber?size=8"
    );
    return response.data as number[];
  } catch (error) {
    console.error("Error fetching high scores:", error);
    throw error;
  }
};

const Level1 = () => {
  const navigate = useNavigate();
  const gameNumbers = useLoaderData() as number[];
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [timer, setTimer] = useState(99);
  const [gameOver, setGameOver] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [puzzelList, setPuzzelList] = useState<number[]>([]);
  const [attempt, setAttempt] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer <= 0) {
      setGameOver(true);
      clearInterval(interval);
    }

    if (puzzelList.length === 8) {
      clearInterval(interval);
      setIsUnlocked(true);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer, puzzelList, gameOver]);

  useEffect(() => {
    if (isUnlocked) {
      navigate("/addnewhighscore", {
        state: { attempt, timer },
      });
    }
  }, [isUnlocked, attempt, timer, navigate]);

  const handleButtonPress = (nextNumber: number) => {
    const lastNumber = puzzelList[puzzelList.length - 1];
    const expectedNumber = lastNumber + 1;
    const startNumber = 1;

    if (puzzelList.length === 0) {
      if (nextNumber === startNumber) {
        setPuzzelList([...puzzelList, nextNumber]);
      } else {
        setPuzzelList([]);
        setAttempt((attempt) => attempt + 1);
      }
    } else if (nextNumber === expectedNumber) {
      setPuzzelList([...puzzelList, nextNumber]);
    } else {
      setPuzzelList([]);
      setAttempt((attempt) => attempt + 1);
    }
    setButtonDisabled(true);

    setTimeout(() => {
      setButtonDisabled(false);
    }, 300);
  };

  return (
    <div className={gameStyle.level}>
      <div className={gameStyle.attempts}>
        <h3>Attempt: {attempt}</h3>
      </div>
      <div className={gameStyle.stage}>
        <h3>Level 1</h3>
      </div>
      <div className={gameStyle.timer}>
        <h3>Timer: {timer}s</h3>
      </div>
      <div className={gameStyle.list}>
        <h3>PuzzelList: {puzzelList}</h3>
      </div>
      {/* {gameOver && (
        <EndMessage level="level" clear={isUnlocked} gameover={gameOver} />
      )}
      {isUnlocked && <h2>Safe Unlocked!</h2>} */}
      <div className={gameStyle.options}>
        {gameNumbers.map((value) => (
          <button
            key={value}
            onClick={() => handleButtonPress(value)}
            disabled={buttonDisabled}
          >
            {value} easy mode here!
          </button>
        ))}
      </div>
    </div>
  );
};

export default Level1;
