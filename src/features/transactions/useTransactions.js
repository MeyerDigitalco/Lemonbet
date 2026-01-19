import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/store";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { getApiHost } from "../../utils/config";
import { useLanguage } from "../localisation/useLanguage";
import {
  setCurrentTransactionsPage,
  setIsTransactionsLoading,
  setTotalTransactionsRecords,
  setTransactions,
  setTransactionsPageSize,
  clearTransactions as clearTransactionsReducer,
} from "./transactionsSlice";

export const useTransactions = () => {
  const { setLocalizedError } = useLanguage();
  const token = useAppSelector(state => state.user.token || null);
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(state => state.transactions.transactions || []);
  const totalPages = useAppSelector(state => state.transactions.totalPages || 0);
  const pageSize = useAppSelector(state => state.transactions.pageSize || 30);
  const currentPage = useAppSelector(state => state.transactions.currentPage || 1);
  const isTransactionsLoading = useAppSelector(state => state.transactions.isTransactionsLoading || false);
  const apiURL = getApiHost();

  const getTransactions = useCallback((page, itemsPerPage = pageSize) => {
    if (itemsPerPage !== pageSize) {
      dispatch(setTransactionsPageSize(itemsPerPage));
    }

    if (!token || !apiURL) return;

    dispatch(setIsTransactionsLoading(true));

    const data = new FormData();
    data.append("action", "ShowMoneyTransfers");
    data.append("token", token);
    data.append("page", page.toString());
    data.append("pagesize", itemsPerPage.toString());

    axios.post(apiURL, data)
      .then(response => {
        const { success, error, data: moneyTransfers, total_transfers } = response.data;

        if (success) {
          if (moneyTransfers) {
            moneyTransfers.forEach(t => t.uuid = uuidv4());
            dispatch(setTransactions(moneyTransfers));
            dispatch(setCurrentTransactionsPage(page));
          }
          if (total_transfers) {
            dispatch(setTotalTransactionsRecords(total_transfers));
          }
        }

        if (error) {
          setLocalizedError(error);
        }
      })
      .finally(() => {
        dispatch(setIsTransactionsLoading(false));
      });
  }, [apiURL, dispatch, pageSize, setLocalizedError, token]);

  const clearTransactions = useCallback(() => {
    dispatch(clearTransactionsReducer());
  }, [dispatch]);

  return {
    transactions,
    getTransactions,
    clearTransactions,
    isTransactionsLoading,
    totalPages,
    pageSize,
    currentPage,
  };
};
