import { useMemo } from "react";
import { alpha, Box, Stack, Typography, useTheme } from "@mui/material";
import NotificationIcon from "./NotificationIcon";
import { useLanguage } from "../.././../features/localisation/useLanguage";
import ReactMarkdown from "react-markdown";
import { convertCentsToCurrencyString } from "../.././../features/common_funcs";

const NotificationCard = ({ notification, onClick }) => {
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
    () => new Date(notification.created_at).toLocaleString(),
    [notification.created_at]
  );

  return (
    <Box
      onClick={onClick}
      border={`2px solid ${
        notification.read_at === null ? theme.palette.primary.main : "#0000"
      }`}
      display={"flex"}
      p={1}
      width={"300px"}
      borderRadius={"10px"}
      boxShadow={`2px 2px 15px ${alpha(theme.palette.background.default, 0.99)}`}
      gap={1}
      sx={{
        backgroundColor: theme.palette.background.default,
        cursor: "pointer",
      }}
    >
      <NotificationIcon
        iconUrl={
          (() => {
            switch (notification.notification_type) {
              case "security_announcement":
                return null; //return SecurityIcon;
              case "jackpot_win":
                return null; //return JackpotWinIcon;
              case "daily_reward":
                return null; //return FreespinsIcon;
              case "announcement":
              default:
                return null; //return UniversalIcon;
            }
          })()
        }
      />
      <Stack maxHeight={"80px"} overflow={"hidden"}>
        <Typography fontWeight={900} fontSize={theme.typography.pxToRem(14)}>
          {(() => {
            switch (notification.notification_type) {
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
        </Typography>
        <Box
          fontSize={theme.typography.pxToRem(12)}
          overflow={"hidden"}
          flexGrow={1}
          sx={{
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        >
          <ReactMarkdown
            components={{
              p: ({ node, ...props }) => (
                <Typography
                  fontSize={theme.typography.pxToRem(12)}
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
                  sx={{ fontWeight: 800, color: theme.palette.primary.main }}
                >
                  {children}
                </Typography>
              ),
            }}
          >
            {(() => {
              switch (notification.notification_type) {
                case "jackpot_win":
                  return langNotifications.notificationTypes.jackpotWin.message
                    .replace(
                      "{amount}",
                      notification.notification_data?.jackpot_win_amount
                        ? convertCentsToCurrencyString(
                            notification.notification_data.jackpot_win_amount
                          )
                        : "--"
                    )
                    .replace(
                      "{jackpot_name}",
                      notification.notification_data?.jackpot_name ?? "--"
                    );
                case "daily_reward":
                  return langNotifications.notificationTypes.dailyRewardUnlocked.message;
                case "security_announcement":
                case "announcement":
                default:
                  if (notification.notification_data?.message) {
                    if (notification.notification_data.message.hasOwnProperty(langShort)) {
                      return notification.notification_data.message[langShort];
                    } else if (notification.notification_data.message.hasOwnProperty("en")) {
                      return notification.notification_data.message.en;
                    }
                  }
                  return "";
              }
            })()}
          </ReactMarkdown>
        </Box>
        <Typography
          fontWeight={100}
          fontSize={theme.typography.pxToRem(10)}
          textAlign={"right"}
        >
          {localTime}
        </Typography>
      </Stack>
    </Box>
  );
};

export default NotificationCard;
