import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./models/state";
import { Loaders } from "./models/loaders";

const DailyTasksSlice = createSlice({
    name: 'dailyTasks',
    initialState,
    reducers: {
        setLoaders: (state, action) => {
            switch (action.payload.loader) {
                case Loaders.isDailyTasksLoading:
                    state.isDailyTasksLoading = action.payload.isLoading;
                    break;
                case Loaders.isFreeSpinGamesLoading:
                    state.isFreeSpinGamesLoading = action.payload.isLoading;
                    break;
                case Loaders.isRewardClaimLoading:
                    state.isRewardClaimLoading = action.payload.isLoading;
                    break;
            }
        },
        setDailyTasks: (state, action) => {
            state.dailyTasks = action.payload;
        },
        setFreeSpinGames: (state, action) => {
            state.freeSpinGames = action.payload;
        },
        setDailyRewardsModalOpened: (state, action) => {
            state.dailyRewardsModalOpened = action.payload;
        },
    }
});

export default DailyTasksSlice.reducer;

export const {
    setLoaders,
    setDailyTasks,
    setFreeSpinGames,
    setDailyRewardsModalOpened
} = DailyTasksSlice.actions;
