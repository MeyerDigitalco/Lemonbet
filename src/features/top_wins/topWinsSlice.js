import { initial } from "./models/state";
import { createSlice } from "@reduxjs/toolkit";
import { TopWinsLoader } from "./models/loaders";

export const TopWinsSlice = createSlice({
  name: "topWins",
  initialState: initial,
  reducers: {
    resetTopWins: (state) => {
      state.topWins = null;
      state.isTopWinsLoading = false;
    },
    setTopWinsLoader: (state, action) => {
      switch (action.payload.loader) {
        case TopWinsLoader.isTopWinsLoading:
          state.isTopWinsLoading = action.payload.isLoading;
          break;
      }
    },
    setTopWins: (state, action) => {
      state.topWins = action.payload;
    },
  },
});

export const { setTopWins, setTopWinsLoader, resetTopWins } = TopWinsSlice.actions;
export default TopWinsSlice.reducer;
