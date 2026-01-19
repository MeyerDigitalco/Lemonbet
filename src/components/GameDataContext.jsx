// src/pages/sections/GameDataContext.jsx
import { createContext, useState, useContext } from "react";

// ✅ Named export of the context
export const GameDataContext = createContext();

// ✅ Provider component
export const GameDataProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <GameDataContext.Provider value={{ loading, setLoading }}>
      {children}
    </GameDataContext.Provider>
  );
};

// ✅ Custom hook for convenience
export const useGameData = () => useContext(GameDataContext);
