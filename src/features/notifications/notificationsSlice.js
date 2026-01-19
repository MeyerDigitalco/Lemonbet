import { createSlice } from "@reduxjs/toolkit";
import Loaders from "./models/loaders";

const initialState = {
    notifications: null,
    unreadNotifications: null,
    openedNotification: null,
    totalNotifications: 0,
    isNotificationsLoading: false,
    isNotificationUpdating: false,
    isUnreadNotificationsLoading: false
};

const NotificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotificationsLoader: (state, action) => {
            switch (action.payload.loader) {
                case Loaders.isNotificationsLoading:
                    state.isNotificationsLoading = action.payload.isLoading;
                    break;
                case Loaders.isNotificationUpdating:
                    state.isNotificationUpdating = action.payload.isLoading;
                    break;
                case Loaders.isUnreadNotificationsLoading:
                    state.isUnreadNotificationsLoading = action.payload.isLoading;
                    break;
            }
        },
        setNotifications: (state, action) => {
            state.notifications = action.payload;
        },
        updateNotificationInList: (state, action) => {
            if (state.notifications) {
                const index = state.notifications.findIndex(n => n.id === action.payload.id);
                if (index !== -1) {
                    state.notifications[index] = action.payload;
                } else {
                    state.notifications.push(action.payload);
                }
            }
            if (state.unreadNotifications) {
                const index = state.unreadNotifications.findIndex(n => n.id === action.payload.id);
                if (index !== -1) {
                    state.unreadNotifications.splice(index, 1);
                }
            }
        },
        setTotalNotifications: (state, action) => {
            state.totalNotifications = action.payload;
        },
        setUnreadNotifications: (state, action) => {
            state.unreadNotifications = action.payload;
        },
        setOpenedNotification: (state, action) => {
            state.openedNotification = action.payload;
        }
    },
});

export default NotificationsSlice.reducer;

export const {
    setNotificationsLoader,
    setNotifications,
    updateNotificationInList,
    setTotalNotifications,
    setUnreadNotifications,
    setOpenedNotification
} = NotificationsSlice.actions;
