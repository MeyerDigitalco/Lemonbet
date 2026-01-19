import { alpha, Box, useTheme } from "@mui/material";

const NotificationIcon = (props) => {
  const { iconUrl, size } = props;
  const theme = useTheme();

  return (
    <Box
      height={size ?? "50px"}
      borderRadius={"50%"}
      sx={{
        aspectRatio: "1/1",
        backgroundImage: `url(${iconUrl})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      boxShadow={`2px 2px 15px ${alpha(theme.palette.background.default, 0.99)}`}
    />
  );
};

export default NotificationIcon;
