import { createSlice } from "@reduxjs/toolkit";
import { convertUnixToCompactLocaleDate } from "../common_funcs";

const initialState = {
  transactions: [],
  pageSize: 10,
  currentPage: 1,
  totalRecords: 0,
  totalPages: 0,
  isTransactionsLoading: false,
};

export const TransactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload.map((transaction) => ({
        ...transaction,
        request_time: convertUnixToCompactLocaleDate(transaction.request_time_unix),
        respond_time:
          transaction.respond_time_unix !== null
            ? convertUnixToCompactLocaleDate(transaction.respond_time_unix)
            : null,
      }));
    },
    clearTransactions: (state) => {
      state.transactions = [];
    },
    setCurrentTransactionsPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalTransactionsRecords: (state, action) => {
      state.totalRecords = action.payload;
      state.totalPages = Math.ceil(action.payload / state.pageSize);
    },
    setTransactionsPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setIsTransactionsLoading: (state, action) => {
      state.isTransactionsLoading = action.payload;
    },
  },
});

export default TransactionsSlice.reducer;

export const {
  setTransactions,
  setIsTransactionsLoading,
  setTotalTransactionsRecords,
  setTransactionsPageSize,
  setCurrentTransactionsPage,
  clearTransactions,
} = TransactionsSlice.actions;
