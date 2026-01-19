import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/store";
import axios from "axios";
import { useLanguage } from "../localisation/useLanguage";
import { setTopWins, setTopWinsLoader } from "./topWinsSlice";
import { TopWinsLoader } from "./models/loaders";
import { setPlayGamesLoader } from "../games/gamesSlice";
import { convertUnixToCompactLocaleDate } from "../common_funcs";
import { v4 as uuidv4 } from "uuid";
import LoaderService, { ApiRequest } from "../../components/games/hooks/loaderService";
import { getApiHost } from "../../utils/config";
import { Loader } from "../games/models/loaders";

export const useTopWins = () => {
    const dispatch = useAppDispatch();
    const { setLocalizedError, handleNetworkErrors } = useLanguage();
    const token = useAppSelector((state) => state.user.token ?? null);
    const apiURL = getApiHost();

    const topWinsState = useAppSelector((state) => state.topWins);
    const playGames = useAppSelector((state) => state.games.games);

    const hasTopWinsLoaded = useRef(false);
    const isPicUpdated = useRef(false);

    const mapPicUrls = useCallback(
        (topWins) => {
            if (!topWins) return [];
            return topWins.map((topWin) => ({
                ...topWin,
                picUrl: playGames?.find((game) => game.Name === topWin.game_name)?.Pic,
            }));
        },
        [playGames]
    );

    const getTopWins = useCallback(() => {
        if (!token) return;

        if (!LoaderService.isLoading(ApiRequest.ShowTopWins)) {
            LoaderService.setLoading(ApiRequest.ShowTopWins, true);
            // dispatch(
            //     setTopWinsLoader({
            //         loader: TopWinsLoader.isTopWinsLoading,
            //         isLoading: true,
            //     })
            // );

            // const data = new FormData();
            // data.append("action", ApiRequest.ShowTopWins);
            // data.append("token", token);

            // axios
            //     .post(apiURL, data)
            //     .then((response) => {
            //         const { success, error, data: topWins } = response.data;
            //         if (success && topWins) {
            //             const processedTopWins = topWins.map((topWin) => ({
            //                 ...topWin,
            //                 time: convertUnixToCompactLocaleDate(topWin.time_unix),
            //                 uuid: uuidv4(),
            //                 multiplier: parseFloat(
            //                     (topWin.deposit_sum / topWin.withdraw_sum).toFixed(2)
            //                 ),
            //             }));

            //             dispatch(setTopWins(processedTopWins));
            //             hasTopWinsLoaded.current = true;
            //             isPicUpdated.current = false;
            //         }

            //         if (error) {
            //             if (error.code === 2) {
            //                 dispatch(setTopWins([]));
            //             } else {
            //                 setLocalizedError(error);
            //             }
            //         }
            //     })
            //     .catch((error) => {
            //         handleNetworkErrors(error);
            //     })
            //     .finally(() => {
            //         LoaderService.finishLoading(ApiRequest.ShowTopWins);
            //         dispatch(
            //             setPlayGamesLoader({
            //                 loader: Loader.isProvidersOutcomeLoading,
            //                 isLoading: false,
            //             })
            //         );
            //     });
        }
    }, [apiURL, token, dispatch, handleNetworkErrors, setLocalizedError]);

    useEffect(() => {
        // if (hasTopWinsLoaded.current && playGames && !isPicUpdated.current) {
        //     const updatedTopWins = mapPicUrls(topWinsState.topWins);
        //     dispatch(setTopWins(updatedTopWins));
        //     isPicUpdated.current = true;
        // }
    }, [playGames, topWinsState.topWins, dispatch, mapPicUrls]);

    return {
        ...topWinsState,
        getTopWins,
    };
};
