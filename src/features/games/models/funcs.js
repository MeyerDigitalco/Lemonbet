export const groupGamesByProviders = (providers, games, type) => {
  const typeFiltered = type === null ? games : games.filter(game => game.game_type === type);
  const filteredProviders =
    type === null
      ? providers
      : providers.filter(provider =>
          typeFiltered.some(game => game.provider_name === provider.provider_name)
        );

  return filteredProviders.map(provider => {
    const gamesGroup = typeFiltered.filter(game => game.provider_name === provider.provider_name);
    return {
      provider: provider,
      games: gamesGroup,
      gamesCount: gamesGroup.length,
    };
  });
};
