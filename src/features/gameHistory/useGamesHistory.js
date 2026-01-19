import { useAppDispatch, useAppSelector } from "../../utils/store";
import { useCallback } from "react";
import axios from "axios";
import Config, { getApiHost } from "../../utils/config";
import {
  setCurrentGameHistoryPage,
  setGameHistory,
  setGamePageSize,
  setIsGameHistoryLoading,
  setTotalRecords,
  clearGameHistory as clearGameHistoryReducer,
} from "./gameHistorySlice";
import { useLanguage } from "../localisation/useLanguage";
import { v4 as uuidv4 } from "uuid";

export const useGamesHistory = () => {
  const { setLocalizedError, handleNetworkErrors } = useLanguage();
  const token = useAppSelector((state) => state.user.token ?? null);
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.gamesHistory);
  const apiURL = getApiHost();

  const getGameHistory = useCallback(
    (page, itemsPerPage = state.pageSize) => {
      let itemsPerPageToSend = state.pageSize;
      if (itemsPerPage !== state.pageSize) {
        dispatch(setGamePageSize(itemsPerPage));
        itemsPerPageToSend = itemsPerPage;
      }

      let pageToSend = state.currentPage;
      if (page !== state.currentPage) {
        dispatch(setCurrentGameHistoryPage(page));
        pageToSend = page;
      }

      if (token && apiURL) {
        dispatch(setIsGameHistoryLoading(true));

        const data = new FormData();
        data.append("action", "ShowGameHistory");
        data.append("token", token);
        data.append("page", pageToSend.toString());
        data.append("pagesize", itemsPerPageToSend.toString());

        axios
          .post(apiURL, data)
          .then((response) => {
            const { success, error, data: gameHistory, total_transactions } = response.data;

            if (success) {
              if (gameHistory) {
                gameHistory.forEach((game) => {
                  game.uuid = uuidv4();
                });
                dispatch(setGameHistory(gameHistory));
              }
              if (total_transactions) {
                dispatch(setTotalRecords(total_transactions));
              }
            }

            if (error) {
              if (error.code === 2) {
                dispatch(setGameHistory([]));
                if (total_transactions && total_transactions > 0) {
                  setLocalizedError(error);
                }
              } else {
                setLocalizedError(error);
              }
            }
          })
          .catch((error) => {
            dispatch(setGameHistory([]));
            handleNetworkErrors(error);
          })
          .finally(() => {
            dispatch(setIsGameHistoryLoading(false));
          });
      }
    },
    [
      apiURL,
      dispatch,
      handleNetworkErrors,
      setLocalizedError,
      state.currentPage,
      state.pageSize,
      token,
    ]
  );

  const clearGameHistory = useCallback(() => {
    dispatch(clearGameHistoryReducer());
  }, [dispatch]);

  return { ...state, getGameHistory, clearGameHistory };
};
