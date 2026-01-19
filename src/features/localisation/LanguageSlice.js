import { createSlice } from "@reduxjs/toolkit";
import { esLang } from "./pack/esLang";

const initialState = {
  languagePack: esLang,
};

export const LanguageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLang: (state, action) => {
      state.languagePack = action.payload;
    },
  },
});

export default LanguageSlice.reducer;
export const { changeLang } = LanguageSlice.actions;
