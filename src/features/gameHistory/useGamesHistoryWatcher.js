// useGamesHistoryWatcher.jsx
import { useLocation } from "react-router-dom";
import { useGamesHistory } from "./useGamesHistory";
import { useEffect } from "react";
import { getNumberParam } from "../common_funcs";

/**
 * Custom hook that watches URL parameters (page, pageSize)
 * and triggers game history loading when needed.
 * 
 * @param {boolean} disabled - Optional flag to disable the watcher
 */
export const useGamesHistoryWatcher = (disabled = false) => {
  const location = useLocation();
  const {
    pageSize,
    currentPage,
    getGameHistory,
    gameHistory,
    isGameHistoryLoading,
  } = useGamesHistory();

  useEffect(() => {
    if (!isGameHistoryLoading && !disabled) {
      const searchParams = new URLSearchParams(location.search);
      const qPage = getNumberParam(searchParams.get("page"));
      const qPageSize = getNumberParam(searchParams.get("pageSize"));

      const pageHasChanges = qPage !== null && qPage !== currentPage;
      const pageSizeHasChanges = qPageSize !== null && qPageSize !== pageSize;
      const gamesNotLoadedYet = gameHistory === null;

      // If URL params or data have changed, fetch updated game history
      if (pageHasChanges || pageSizeHasChanges || gamesNotLoadedYet) {
        const pageNew = qPage !== null ? qPage : 1;
        const newPageSize = qPageSize !== null ? qPageSize : pageSize;
        //getGameHistory(pageNew, newPageSize);
      }
    }
  }, [
    currentPage,
    disabled,
    gameHistory,
    getGameHistory,
    isGameHistoryLoading,
    location.search,
    pageSize,
  ]);
};
