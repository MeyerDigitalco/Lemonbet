import { useEffect, useMemo, useRef } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import useNotifications from "../.././../features/notifications/useNotifications";
import { useAppDispatch } from "../../../utils/store";
import { setOpenedNotification } from "../.././../features/notifications/notificationsSlice";
import NotificationIcon from "./NotificationIcon";
// import JackpotWinIcon from "../../.././notifications/win-jackpot-icon.webp";
// import SecurityIcon from "../../.././notifications/security-notification.webp";
// import FreespinsIcon from "../../.././notifications/freespins-notification.webp";
// import UniversalIcon from "../../.././notifications/universal-notification.webp";
import { useLanguage } from "../.././../features/localisation/useLanguage";
import ReactMarkdown from "react-markdown";
import { convertCentsToCurrencyString } from "../.././../features/common_funcs";

const FullNotificationWindow = () => {
  const { openedNotification } = useNotifications();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const {
    languagePack: {
      pack: {
        argentina: { notifications: langNotifications },
      },
      langShort,
    },
  } = useLanguage();
  const localTime = useMemo(
    () =>
      openedNotification !== null
        ? new Date(openedNotification.created_at).toLocaleString()
        : "",
    [openedNotification]
  );
  const prevNotification = useRef(null);
  const { markNotificationAsRead } = useNotifications();

  const closeNotificationHandler = () => {
    dispatch(setOpenedNotification(null));
  };

  useEffect(() => {
    if (prevNotification.current !== openedNotification) {
      prevNotification.current = openedNotification;
      if (
        openedNotification !== null &&
        openedNotification.read_at === null
      ) {
        markNotificationAsRead(openedNotification.id);
      }
    }
  }, [markNotificationAsRead, openedNotification]);

  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={Boolean(openedNotification)}
      onClose={closeNotificationHandler}
    >
      {openedNotification !== null && (
        <>
          <DialogTitle>
            {(() => {
              switch (openedNotification.notification_type) {
                case "jackpot_win":
                  return langNotifications.notificationTypes.jackpotWin.title;
                case "daily_reward":
                  return langNotifications.notificationTypes.dailyRewardUnlocked.title;
                case "security_announcement":
                  return langNotifications.notificationTypes.securityAnnouncement.title;
                case "announcement":
                  return langNotifications.notificationTypes.announcement.title;
                default:
                  return "";
              }
            })()}
          </DialogTitle>
          <DialogContent sx={{ overflow: "visible" }}>
            <Box display="flex" gap={1}>
              <NotificationIcon
                iconUrl={(() => {
                //   switch (openedNotification.notification_type) {
                //     case "security_announcement":
                //       return SecurityIcon;
                //     case "jackpot_win":
                //       return JackpotWinIcon;
                //     case "daily_reward":
                //       return FreespinsIcon;
                //     case "announcement":
                //     default:
                //       return UniversalIcon;
                //  }
                })()}
                size="100px"
              />
              <Stack>
                <Typography
                  fontWeight={100}
                  fontSize={theme.typography.pxToRem(12)}
                  textAlign="right"
                >
                  {localTime}
                </Typography>
                <ReactMarkdown
                  components={{
                    p: ({ node, ...props }) => (
                      <Typography
                        fontSize={theme.typography.pxToRem(14)}
                        fontWeight={400}
                        my={0}
                        lineHeight={1.5}
                      >
                        {props.children}
                      </Typography>
                    ),
                    strong: ({ children }) => (
                      <Typography
                        component="span"
                        sx={{
                          fontWeight: 800,
                          color: theme.palette.primary.main,
                          fontSize: theme.typography.pxToRem(16),
                        }}
                      >
                        {children}
                      </Typography>
                    ),
                  }}
                >
                  {(() => {
                    switch (openedNotification.notification_type) {
                      case "jackpot_win":
                        return langNotifications.notificationTypes.jackpotWin.message
                          .replace(
                            "{amount}",
                            openedNotification.notification_data?.jackpot_win_amount
                              ? convertCentsToCurrencyString(
                                  openedNotification.notification_data
                                    .jackpot_win_amount
                                )
                              : "--"
                          )
                          .replace(
                            "{jackpot_name}",
                            openedNotification.notification_data?.jackpot_name ?? "--"
                          );
                      case "daily_reward":
                        return langNotifications.notificationTypes.dailyRewardUnlocked.message;
                      case "security_announcement":
                      case "announcement":
                      default:
                        if (openedNotification.notification_data?.message) {
                          if (
                            openedNotification.notification_data.message.hasOwnProperty(
                              langShort
                            )
                          ) {
                            return openedNotification.notification_data.message[langShort];
                          } else if (
                            openedNotification.notification_data.message.hasOwnProperty("en")
                          ) {
                            return openedNotification.notification_data.message.en;
                          }
                        }
                        return "";
                    }
                  })()}
                </ReactMarkdown>
              </Stack>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeNotificationHandler}>
              {langNotifications.gotItBTN}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default FullNotificationWindow;
