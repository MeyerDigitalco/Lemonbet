import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { UserSlice } from "./../features/user/userSlice";
import { ErrorSlice } from "./../features/errorSlice";
import { GameHistorySlice} from "./../features/gameHistory/gameHistorySlice";
import { TransactionsSlice } from "./../features/transactions/transactionsSlice";
import { LanguageSlice } from "./../features/localisation/LanguageSlice";
import GamesSlice from "./../features/games/gamesSlice";
import { TopWinsSlice } from "./../features/top_wins/topWinsSlice";
import ErrorV2Slice from "./../features/api-error-v2/errorV2Slice";
import BannersSlice from "./../features/banners/bannersSlice";
import NotificationsSlice from "./../features/notifications/notificationsSlice";
import DailyTasksSlice from "./../features/daily-tasks/dailyTasksSlice";

export const store = configureStore({
  reducer: {
    lang: LanguageSlice.reducer,
    user: UserSlice.reducer,
    gamesHistory: GameHistorySlice.reducer,
    transactions: TransactionsSlice.reducer,
    errors: ErrorSlice.reducer,
    games: GamesSlice,
    topWins: TopWinsSlice.reducer,
    errorsV2: ErrorV2Slice,
    banners: BannersSlice,
    dailyTasks: DailyTasksSlice,
    notifications: NotificationsSlice,
  },
});

export default store;

// Use these instead of plain useDispatch and useSelector
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
