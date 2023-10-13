import React from "react";
import axios from "axios";

export const CalculateScore = async (attempt: number, time: number) => {
  try {
    const response = await axios.get(
      `https://localhost:7112/api/HighScore/CalculateHighScore?totalAttempts=${attempt}&ClearTime=${time}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching score:", error);
    throw error;
  }
};
