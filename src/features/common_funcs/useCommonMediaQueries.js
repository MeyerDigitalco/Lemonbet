import { useMediaQuery, useTheme } from "@mui/material";
import { useMemo } from "react";
/*
Global version 2.2.0
*/

export const useCommonMediaQueries = () => {
  const theme = useTheme();

  // @deprecated
  const portraitMode = useMediaQuery("(orientation: portrait)");
  const xxSmallScreen = useMediaQuery("(max-width: 450px)");
  const smallScreen = useMediaQuery("(max-width: 767px)");
  const mediumScreen = useMediaQuery("(max-width: 960px)");
  const largeScreen = useMediaQuery("(max-width: 1200px)");
  const xLargeScreen = useMediaQuery("(max-width: 1536px)");

  // You must customize theme breakpoints
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
  const xl = useMediaQuery(theme.breakpoints.down("xl"));

  const smZone = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  const mdZone = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const lgZone = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const xlZone = useMediaQuery(theme.breakpoints.between("lg", "xl"));

  const currentMediaQuery = useMemo(() => {
    if (xs) return "xs";
    if (smZone) return "sm";
    if (mdZone) return "md";
    if (lgZone) return "lg";
    if (xlZone) return "xl";
    return null;
  }, [xs, smZone, mdZone, lgZone, xlZone]);

  const mediumScreenMin = useMediaQuery("(min-width: 768px)");

  return {
    portraitMode,
    mediumScreenMin,
    xs,
    sm,
    md,
    lg,
    xl,
    currentMediaQuery,
    xxSmallScreen,
    smallScreen,
    mediumScreen,
    largeScreen,
    xLargeScreen,
  };
};
