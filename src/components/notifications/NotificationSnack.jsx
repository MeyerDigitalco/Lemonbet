import React, { useEffect } from "react";
import { SnackbarContent, useSnackbar } from "notistack";


const NotificationSnack = React.forwardRef((props, ref) => {
    const { id, message, notification, ...other } = props;
    const dispatch = useAppDispatch();
    const { closeSnackbar } = useSnackbar();
    const { markNotificationAsRead } = useNotifications();

    // Play sound when mounting
    useEffect(() => {
        const audio = new Audio("/sounds/notification-alert.mp3");
        audio.play().catch((error) => {
            console.error("Sound reproduction error:", error);
        });
    }, []);

    const handleClick = () => {
        if (notification.notification_type === 'daily_reward') {
            // For daily reward notifications, open the daily tasks modal instead of the notification popup
            dispatch(setDailyRewardsModalOpened(true));
            if (notification.read_at === null) {
                markNotificationAsRead(notification.id);
            }
        } else {
            // For other notification types, use the original behavior
            dispatch(setOpenedNotification(notification));
        }
        closeSnackbar(id);
    };

    return (
        <SnackbarContent ref={ref} role="alert" {...other}>
            <NotificationCard notification={notification} onClick={handleClick} />
        </SnackbarContent>
    );
});

export default NotificationSnack;
