import React, { useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Box, IconButton } from "@mui/material";
import usePeriodicNotifications from ".././../features/notifications/hooks/usePeriodicNotifications";
import NotificationList from "./notification-elements/NotificationList";
import { useCommonMediaQueries } from ".././../features/common_funcs/useCommonMediaQueries";
import NotificationBadge from "./notification-elements/NotificationBadge";

const Notification = () => {
  const { unreadNotifications } = usePeriodicNotifications();
  const [opened, setOpened] = useState(false);
  const { smallScreen } = useCommonMediaQueries();

  return (
    <Box position="relative">
      <IconButton
        onClick={() => setOpened(true)}
        disableRipple={smallScreen}
      >
        <MailOutlineIcon fontSize={smallScreen ? "medium" : "large"} />
      </IconButton>

      {unreadNotifications !== null && unreadNotifications.length > 0 && (
        <NotificationBadge count={unreadNotifications.length} />
      )}

      {opened && (
        <NotificationList open={opened} onClose={() => setOpened(false)} />
      )}
    </Box>
  );
};

export default Notification;
