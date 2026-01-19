export const initialState = {
  gameType: null,
  providers: null,
  providersFiltered: null, // only providers which have games
  selectedProvider: null,
  games: null,
  groupedGames: null, // games grouped by provider
  gameSession: {
    SessionId: null,
    SessionUrl: null,
    SessionHTML: null,
  },
  sportUrl: null,

  isProvidersOutcomeLoading: false,
  isOutcomeGameLoading: false,
  isGameSessionLoading: false,
  isSportsBookLoading: false,
};
