import { createSlice } from "@reduxjs/toolkit";
import { groupGamesByProviders } from "./models/funcs";
import { initialState } from "./models/state";
import { Loader } from "./models/loaders";

const GamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    resetPlayGamesSlice: (state) => {
      state.providers = null;
      state.providersFiltered = null;
      state.selectedProvider = null;
      state.games = null;
      state.groupedGames = null;
      state.gameSession = {
        SessionId: null,
        SessionUrl: null,
        SessionHTML: null,
      };
      state.gameType = null;
      state.sportUrl = null;

      state.isProvidersOutcomeLoading = false;
      state.isOutcomeGameLoading = false;
      state.isGameSessionLoading = false;
      state.isSportsBookLoading = false;
    },
    setPlayGamesLoader: (state, action) => {
      switch (action.payload.loader) {
        case Loader.isProvidersOutcomeLoading:
          state.isProvidersOutcomeLoading = action.payload.isLoading;
          break;
        case Loader.isOutcomeGameLoading:
          state.isOutcomeGameLoading = action.payload.isLoading;
          break;
        case Loader.isGameSessionLoading:
          state.isGameSessionLoading = action.payload.isLoading;
          break;
        case Loader.isSportsBookLoading:
          state.isSportsBookLoading = action.payload.isLoading;
          break;
        default:
          break;
      }
    },
    setProvidersOutcome: (state, action) => {
      state.providers = action.payload;
    },
    setSelectedProviderName: (state, action) => {
      state.selectedProvider = action.payload;
    },
    setOutcomeGames: (state, action) => {
      state.games = action.payload;
      if (state.providers && action.payload) {
        state.groupedGames = groupGamesByProviders(
          state.providers,
          action.payload,
          state.gameType
        );
      }
    },
    setGameSession: (state, action) => {
      state.gameSession = action.payload;
    },
    reFilterGamesByType: (state, action) => {
      state.gameType = action.payload;
      if (state.providers && state.games) {
        state.groupedGames = groupGamesByProviders(
          state.providers,
          state.games,
          state.gameType
        );
      }
    },
    setSportUrl: (state, action) => {
      state.sportUrl = action.payload;
    },
  },
});

export default GamesSlice.reducer;

export const {
  resetPlayGamesSlice,
  setPlayGamesLoader,
  setProvidersOutcome,
  setSelectedProviderName,
  setOutcomeGames,
  setGameSession,
  reFilterGamesByType,
  setSportUrl,
} = GamesSlice.actions;
