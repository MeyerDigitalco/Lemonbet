import { useCallback } from "react";
import makeApiRequest from "../makeApiRequest";
import {
  setNotifications,
  setNotificationsLoader,
  setTotalNotifications,
  setUnreadNotifications,
  updateNotificationInList,
} from "./notificationsSlice";
import Loaders from "./models/loaders";
import { useAppDispatch, useAppSelector } from "../../utils/store";
import appEnv from "../../utils/appEnv";
import { enqueueSnackbar } from "notistack";
import { useUser } from "../user/useUser";

const useNotifications = () => {
  const state = useAppSelector((state) => state.notifications);
  const { token } = useUser();
  const dispatch = useAppDispatch();

  // Show custom snackbar-style notification
  const handleShowCustomNotification = (notification) => {
    enqueueSnackbar("This is a custom alert!", {
      autoHideDuration: 6000,
      anchorOrigin: { vertical: "top", horizontal: "center" },
      variant: "notificationAlert",
      notification: notification,
    });
  };

  // Fetch all notifications for a user
  const getNotifications = useCallback(
    (userId, onSuccess) => {
      if (appEnv.apiUrl && token) {
        makeApiRequest(
          "get",
          `${appEnv.apiUrl}/notifications/user/${userId}`,
          token,
          dispatch,
          undefined,
          (isLoading) =>
            dispatch(
              setNotificationsLoader({
                loader: Loaders.isNotificationsLoading,
                isLoading,
              })
            )
        )
          .then((response) => {
            const { items } = response;
            const filtered = items.filter(
              (n) =>
                !["daily_reward_reset", "daily_reward_fs"].includes(
                  n.notification_type
                )
            );
            dispatch(setNotifications(filtered));
            dispatch(setTotalNotifications(filtered.length));
            if (onSuccess) onSuccess();
          })
          .catch((error) => {
            console.error("Failed to fetch notifications:", error.message);
            dispatch(setNotifications([]));
          });
      }
    },
    [dispatch, token]
  );

  // Fetch unread notifications and handle new incoming ones
  const getUnreadNotifications = useCallback(
    (userId, onSuccess, onError) => {
      if (!appEnv.apiUrl || !token) return;

      // makeApiRequest(
      //   "get",
      //   `${appEnv.apiUrl}/notifications/user/${userId}/unread`,
      //   token,
      //   dispatch,
      //   undefined,
      //   (isLoading) =>
      //     dispatch(
      //       setNotificationsLoader({
      //         loader: Loaders.isUnreadNotificationsLoading,
      //         isLoading,
      //       })
      //     ),
      //   "toast"
      // )
      //   .then((response) => {
      //     const { items: _items } = response;
      //     const items = _items.filter(
      //       (n) =>
      //         !["daily_reward_reset", "daily_reward_fs"].includes(
      //           n.notification_type
      //         )
      //     );

      //     dispatch((_, getState) => {
      //       const currentState = getState().notifications;
      //       const currentUnread = currentState.unreadNotifications || [];

      //       const newUnreadNotifications = items.filter(
      //         (newItem) =>
      //           !currentUnread.some((existing) => existing.id === newItem.id)
      //       );

      //       // Display notifications
      //       if (
      //         currentState.unreadNotifications !== null &&
      //         newUnreadNotifications.length > 0
      //       ) {
      //         newUnreadNotifications.forEach((notification) =>
      //           handleShowCustomNotification(notification)
      //         );
      //       } else if (newUnreadNotifications.length > 0) {
      //         const popUpOnly = newUnreadNotifications.filter(
      //           (n) => n.notification_data?.popup === true
      //         );
      //         if (popUpOnly.length > 0) {
      //           popUpOnly.forEach((notification) =>
      //             handleShowCustomNotification(notification)
      //           );
      //         }
      //       }

      //       dispatch(setUnreadNotifications(items));
      //     });

      //     if (onSuccess) onSuccess();
      //   })
      //   .catch((error) => {
      //     if (onError) onError(error);
      //     dispatch(setUnreadNotifications([]));
      //   });
    },
    [dispatch, token]
  );

  // Mark a notification as read
  const markNotificationAsRead = useCallback(
    (notificationId, onSuccess) => {
      if (appEnv.apiUrl && token) {
        makeApiRequest(
          "put",
          `${appEnv.apiUrl}/notifications/${notificationId}/mark-read`,
          token,
          dispatch,
          undefined,
          (isLoading) =>
            dispatch(
              setNotificationsLoader({
                loader: Loaders.isNotificationUpdating,
                isLoading,
              })
            )
        )
          .then((response) => {
            dispatch(updateNotificationInList(response));
            if (onSuccess) onSuccess(response);
          })
          .catch((error) => {
            console.error("Failed to mark notification as read:", error.message);
          });
      }
    },
    [dispatch, token]
  );

  return {
    ...state,
    getNotifications,
    markNotificationAsRead,
    getUnreadNotifications,
  };
};

export default useNotifications;
