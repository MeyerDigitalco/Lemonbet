import { useAppDispatch, useAppSelector } from "../../utils/store";
import { useCallback } from "react";
import appEnv from "../../utils/appEnv";
import makeApiRequest from "../makeApiRequest";
import { useUser } from "../user/useUser";
import { setDailyTasks, setFreeSpinGames, setLoaders } from "./dailyTasksSlice";
import { Loaders } from "./models/loaders";

const useDailyTasks = () => {
  const state = useAppSelector((state) => state.dailyTasks);
  const dispatch = useAppDispatch();
  const { token } = useUser();

  const getDailyTasks = useCallback((onSuccess) => {
    if (appEnv.apiUrl && token) {
      makeApiRequest(
        "get",
        `${appEnv.apiUrl}/daily-rewards/reward-map`,
        token,
        dispatch,
        undefined,
        (isLoading) =>
          dispatch(
            setLoaders({
              loader: Loaders.isDailyTasksLoading,
              isLoading,
            })
          ),
        "toast"
      )
        .then(({ items: dailyTasks }) => {
          dispatch(setDailyTasks(dailyTasks));
          if (onSuccess) onSuccess();
        })
        .catch((error) => {
          dispatch(setDailyTasks([]));
          console.error(error);
        });
    }
  }, [dispatch, token]);

  const getFreeSpinGames = useCallback(() => {
    if (appEnv.apiUrl && token) {
      makeApiRequest(
        "get",
        `${appEnv.apiUrl}/daily-rewards/free-spin-games`,
        token,
        dispatch,
        undefined,
        (isLoading) =>
          dispatch(
            setLoaders({
              loader: Loaders.isFreeSpinGamesLoading,
              isLoading,
            })
          ),
        "toast"
      )
        .then(({ items: freeSpinGames }) => {
          dispatch(setFreeSpinGames(freeSpinGames));
        })
        .catch((error) => {
          dispatch(setFreeSpinGames([]));
          console.error(error);
        });
    }
  }, [dispatch, token]);

  const claimReward = useCallback((dailyReward, onSuccess) => {
    if (appEnv.apiUrl && token) {
      makeApiRequest(
        "post",
        `${appEnv.apiUrl}/daily-rewards/claim`,
        token,
        dispatch,
        dailyReward,
        (isLoading) =>
          dispatch(
            setLoaders({
              loader: Loaders.isRewardClaimLoading,
              isLoading,
            })
          )
      )
        .then(() => {
          if (onSuccess) onSuccess();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [dispatch, token]);

  return {
    ...state,
    getDailyTasks,
    getFreeSpinGames,
    claimReward,
  };
};

export default useDailyTasks;
