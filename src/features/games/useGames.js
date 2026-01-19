import { useCallback, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/store";
import { useLanguage } from "../localisation/useLanguage";
import {
  setGameSession,
  setOutcomeGames,
  setPlayGamesLoader,
  setProvidersOutcome,
  setSelectedProviderName,
  setSportUrl,
} from "./gamesSlice";
import axios from "axios";
import Config, { getApiHost } from "../../utils/config";
import LoaderService, { ApiRequest } from "./LoaderService";
import { getDeviceType } from "../common_funcs";
import { Loader } from "./models/loaders";
import { callApi, callApiService } from "../../utils/Utils";
import { AppContext } from "../../AppContext";

export const useGames = () => {
  const { setLocalizedError, handleNetworkErrors, languagePack } = useLanguage();
  const { langShort } = languagePack;
  const token = useAppSelector((state) => state.user.token ?? null);
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.games);
  const apiURL = getApiHost();
  const { contextData } = useContext(AppContext);

  const getProviders = useCallback(
    (onSuccess = () => {}) => {
      if (!apiURL) return;

      dispatch(setPlayGamesLoader({ loader: Loader.isProvidersOutcomeLoading, isLoading: true }));
      axios.create({ ...Config.axiosConfig });

      const data = new FormData();
      data.append("action", "ShowProviders");
      if (token) data.append("token", token);

      axios
        .post(apiURL, data)
        .then((response) => {
          const { success, error, providers } = response.data;
          if (success && providers) {
            dispatch(setProvidersOutcome(providers));
            onSuccess();
          }
          if (error) {
            if (error.code === 2) dispatch(setProvidersOutcome([]));
            else setLocalizedError(error);
          }
        })
        .catch((error) => {
          dispatch(setProvidersOutcome([]));
          handleNetworkErrors(error);
        })
        .finally(() => {
          dispatch(setPlayGamesLoader({ loader: Loader.isProvidersOutcomeLoading, isLoading: false }));
        });
    },
    [apiURL, dispatch, handleNetworkErrors, setLocalizedError, token]
  );

  const getGames = useCallback(
    (providerName) => {
      if (LoaderService.isLoading(ApiRequest.GetGames)) return;

      if (providerName !== state.selectedProvider) {
        dispatch(setSelectedProviderName(providerName ?? null));
      }

      if (!apiURL) return;

      LoaderService.setLoading(ApiRequest.GetGames, true);
      dispatch(setPlayGamesLoader({ loader: Loader.isOutcomeGameLoading, isLoading: true }));
      axios.create({ ...Config.axiosConfig });

      const data = new FormData();
      data.append("action", ApiRequest.GetGames);
      if (providerName) data.append("provider", providerName);
      if (token) data.append("token", token);
      data.append("format", "vertical");

      axios
        .post(apiURL, data)
        .then((response) => {
          const { success, error, games } = response.data;
          if (success && games) dispatch(setOutcomeGames(games));
          if (error) setLocalizedError(error);
        })
        .catch((error) => {
          dispatch(setOutcomeGames([]));
          handleNetworkErrors(error);
        })
        .finally(() => {
          LoaderService.finishLoading(ApiRequest.GetGames);
          dispatch(setPlayGamesLoader({ loader: Loader.isOutcomeGameLoading, isLoading: false }));
        });
    },
    [apiURL, dispatch, handleNetworkErrors, setLocalizedError, state.selectedProvider, token]
  );

  const callbackGameSession = (result) => {
    if (result.status == "0") {
            
      dispatch(
        setGameSession({
          SessionId: "433345677889900" ?? null,
          SessionUrl: result.url ?? null,
          SessionHTML: null,
        })
      );

      dispatch(setPlayGamesLoader({ loader: Loader.isGameSessionLoading, isLoading: false }));
    } else if (result.status == "500" || result.status == "422") {
      
      const error = { "code": 50, "message": "ID missing" };
      handleNetworkErrors(error);
    }
  };

  const startGameSession = useCallback(
    (gameId) => {
      if (!token || !apiURL) return;
      dispatch(setPlayGamesLoader({ loader: Loader.isGameSessionLoading, isLoading: true }));

      callApi(contextData, "GET", "/get-game-url?game_id=" + gameId, callbackGameSession, null);
    },
    [apiURL, dispatch, handleNetworkErrors, langShort, setLocalizedError, token]
  );

  const openSportsBook = useCallback(
    (extension) => {
      if (!apiURL) return;

      dispatch(setPlayGamesLoader({ loader: Loader.isSportsBookLoading, isLoading: true }));
      axios.create({ ...Config.axiosConfig });

      const data = new FormData();
      data.append("action", "OpenSportsBook");
      if (token) data.append("token", token);
      if (extension) data.append("extension", extension);
      data.append("lang", langShort);

      axios
        .post(apiURL, data)
        .then((response) => {
          const { success, error, url } = response.data;
          if (success && url) dispatch(setSportUrl(url));
          if (error) setLocalizedError(error);
        })
        .catch(handleNetworkErrors)
        .finally(() => {
          dispatch(setPlayGamesLoader({ loader: Loader.isSportsBookLoading, isLoading: false }));
        });
    },
    [apiURL, dispatch, handleNetworkErrors, langShort, setLocalizedError, token]
  );

  return { ...state, getProviders, getGames, startGameSession, openSportsBook };
};
