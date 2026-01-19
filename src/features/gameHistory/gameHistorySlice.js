import { createSlice } from "@reduxjs/toolkit";
import { convertUnixToCompactLocaleDate } from "../common_funcs";

const initialState = {
  gameHistory: null,
  pageSize: 10,
  currentPage: 1,
  totalRecords: 0,
  totalPages: 0,
  isGameHistoryLoading: false,
};

export const GameHistorySlice = createSlice({
  name: "games_history",
  initialState,
  reducers: {
    setGameHistory: (state, action) => {
      state.gameHistory = action.payload.map((game) => ({
        ...game,
        time: convertUnixToCompactLocaleDate(game.time_unix),
      }));
    },
    clearGameHistory: (state) => {
      state.gameHistory = null;
    },
    setCurrentGameHistoryPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalRecords: (state, action) => {
      state.totalRecords = action.payload;
      state.totalPages = Math.ceil(action.payload / state.pageSize);
    },
    setGamePageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setIsGameHistoryLoading: (state, action) => {
      state.isGameHistoryLoading = action.payload;
    },
  },
});

export default GameHistorySlice.reducer;

export const {
  setGameHistory,
  setCurrentGameHistoryPage,
  setGamePageSize,
  setTotalRecords,
  setIsGameHistoryLoading,
  clearGameHistory,
} = GameHistorySlice.actions;
