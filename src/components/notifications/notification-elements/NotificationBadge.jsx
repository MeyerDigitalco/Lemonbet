import { Typography } from "@mui/material";

const NotificationBadge = ({ count }) => {
  return (
    <Typography
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        p: 0.4,
        fontSize: "12px", // Text size
        fontWeight: "bold", // Bold text
        animation: "signalBlink 1s infinite ease-in-out", // Animation definition
        pointerEvents: "none",
        "@keyframes signalBlink": {
          "0%": {
            color: "#800000", // Dark red at the start
            textShadow: "0 0 3px #800000", // Small dark shadow
          },
          "50%": {
            color: "#ff0000", // Bright red at the peak
            textShadow: "0 0 6px #ff3c3c", // Larger bright shadow
          },
          "100%": {
            color: "#800000", // Back to dark red
            textShadow: "0 0 3px #800000", // Back to small shadow
          },
        },
      }}
    >
      {count}
    </Typography>
  );
};

export default NotificationBadge;
