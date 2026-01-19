import { createTheme, alpha } from "@mui/material/styles";

import "@fontsource/inter";
import "@fontsource/inter/100.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";

import "@fontsource/poppins";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

export const theme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },

  breakpoints: {
    values: {
      xs: 450,
      sm: 768,
      md: 960,
      lg: 1200,
      xl: 1536,
    },
  },

  palette: {
    mode: "dark",
    background: {
      default: "#05091e",
      paper: "#1C223F",
    },
    primary: {
      light: "#F7E8D3",
      main: "rgb(228, 233, 248)",
      dark: "#b431ad",
      contrastText: "#18171F",
    },
    error: {
      main: "#D32F2F",
      contrastText: "#fff",
    },
    success: {
      main: "#4CAF50",
      contrastText: "#fff",
    },
    warning: {
      main: "#FFB300",
      contrastText: "#000",
    },

    // custom colors for daily tasks and games
    dailyTaskColors: {
      giftCard: {
        simpleBorder: "#C237BB",
        royalBorder: "#FFBE58",
        activeBackground: {
          start: "#241D3C",
          end: "#5C346D",
        },
        notActiveBackground: {
          start: "#3B2750",
          end: "#5C346D",
        },
        claimButtonColors: {
          royal: {
            stroke: { start: "#AE6610", end: "#E5B458" },
            background: { start: "#B36E16", end: "#F8D37E" },
          },
          simple: {
            stroke: { start: "#AD24A4", end: "#DF57D9" },
            background: { start: "#AF1DA7", end: "#E45AE2" },
          },
        },
        rewardValueTextColor: {
          simple: "#DCDBE9",
          royal: "#FFFBF3",
        },
      },
      progressBar: {
        progressBgGradient: {
          side: "#AE23A7",
          center: "#CF58C9",
        },
        emptyProgressBarBg: "#283056",
        chipGradient: { start: "#E969E3", end: "#BD32B6" },
        chipEmptyGradient: { start: "#354071", end: "#283056" },
        bottomHelperColor: "#959CC6",
      },
      titleColors: {
        mainTitleGradient: { start: "#E4E9F8", end: "#B2A6D1" },
        mainTitleSingleColor: "#B9BDCF",
        subTitleColor: "#757C9E",
      },
      topControlsColors: {
        infoButtonBg: "#222947",
        iconColor: "#626A93",
        borderColor: "#353b62",
      },
      gamesListColors: {
        titleColor: "#E1E3EC",
        gameCardHoverBgColor: "#282F4F",
        gameTitleColor: "#CFD1DC",
        gameProviderTitleColor: "#757C9E",
      },
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        "& html, body, #root": {
          maxWidth: "100vw",
          overflow: "hidden",
          height: "100dvh",
        },
        body: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          margin: 0,
        },
        a: {
          color: "inherit",
          textDecoration: "none",
          "&:hover": {
            color: "inherit",
          },
        },
      }),
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          border: `1px solid ${alpha("#fff", 0.07)}`,
          backgroundImage: "none",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          borderWidth: "2px",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            borderWidth: "2px",
          },
        },
        outlined: {
          color: "white",
          borderColor: "rgb(228, 233, 248)",
          "&:hover": {
            borderColor: "#b431ad",
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            "&:hover fieldset": {
              borderColor: "#b431ad",
            },
            "&.Mui-focused fieldset": {
              borderColor: "rgb(228, 233, 248)",
            },
          },
        },
      },
    },

    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          backgroundColor: "#1C223F",
          borderRadius: 20,
          width: "fit-content",
        },
        grouped: {
          margin: "4px",
          border: "none",
          borderRadius: "16px !important",
          "&.Mui-selected": {
            background: "linear-gradient(180deg, #B431AD 0%, #D43DCC 100%)",
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "transparent",
          color: "#9E9E9E",
        },
        body: {
          fontSize: 14,
        },
        root: {
          border: "none",
          "&:first-of-type": {
            borderTopLeftRadius: "25px !important",
            borderBottomLeftRadius: "25px !important",
            paddingLeft: "30px",
          },
          "&:last-of-type": {
            borderTopRightRadius: "25px !important",
            borderBottomRightRadius: "25px !important",
            paddingRight: "30px",
          },
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          "& td": {
            backgroundColor: "#1C223F",
          },
          border: "none",
          "& .MuiTableCell-root": {
            border: "none",
            marginTop: "6px",
          },
        },
      },
    },
  },
});

export default theme;
