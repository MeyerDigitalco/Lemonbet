import { useCallback, useEffect, useState } from "react";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import NotificationCard from "./NotificationCard";
import useNotifications from "../.././../features/notifications/useNotifications";
import { useCommonMediaQueries } from "../.././../features/common_funcs/useCommonMediaQueries";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "../../../utils/store";
import {
  setNotifications,
  setOpenedNotification,
} from "../.././../features/notifications/notificationsSlice";
import { useUser } from "../.././../features/user/useUser";
import { setDailyRewardsModalOpened } from "../.././../features/daily-tasks/dailyTasksSlice";

const NotificationList = ({ onClose, open }) => {
  const { notifications, isNotificationsLoading, getNotifications, markNotificationAsRead } =
    useNotifications();
  const { xxSmallScreen, smallScreen } = useCommonMediaQueries();
  const [justMounted, setJustMounted] = useState(true);
  const { user, token } = useUser();
  const dispatch = useAppDispatch();

  // Fetch notifications on first mount
  useEffect(() => {
    if (
      justMounted &&
      token !== null &&
      user !== null &&
      notifications === null &&
      !isNotificationsLoading
    ) {
      setJustMounted(false);
      getNotifications(user.user_id);
    }
  }, [getNotifications, isNotificationsLoading, justMounted, notifications, token, user]);

  const onCloseHandler = useCallback(() => {
    dispatch(setNotifications(null));
    if (onClose) onClose();
  }, [dispatch, onClose]);

  return (
    <Dialog
      open={open}
      onClose={onCloseHandler}
      sx={{
        "& .MuiDialog-paper": {
          position: "absolute",
          top: 0,
          right: 0,
          margin: 0,
          maxHeight: "100dvh",
          overflowY: "auto",
          minWidth: !xxSmallScreen ? "300px" : "100%",
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Notifications
        {smallScreen && (
          <IconButton onClick={onCloseHandler}>
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent
        sx={{
          gap: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isNotificationsLoading && <CircularProgress />}
        {notifications &&
          notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onClick={() => {
                if (notification.notification_type === "daily_reward") {
                  dispatch(setDailyRewardsModalOpened(true));
                  if (notification.read_at === null) {
                    markNotificationAsRead(notification.id);
                  }
                } else {
                  dispatch(setOpenedNotification(notification));
                }
              }}
            />
          ))}

        {!isNotificationsLoading && !notifications && (
          <Typography>No notifications yet</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NotificationList;
