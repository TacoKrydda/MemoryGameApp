import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import EndMessage from "./EndMessage";

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
    <div>
      <div>
        <h1>Level 1</h1>
        <h2>PuzzelList: {puzzelList}</h2>
        <h2>Timer: {timer}s</h2>
        <h2>Attempt: {attempt}</h2>
        {gameOver && (
          <EndMessage level="level" clear={isUnlocked} gameover={gameOver} />
        )}
        {isUnlocked && <h2>Safe Unlocked!</h2>}
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
