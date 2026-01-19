// features/notifications/hooks/usePeriodicNotifications.js
import { useState, useEffect, useRef, useCallback } from "react";
import useNotifications from "../useNotifications";
import Config from "../../../utils/config";
import { useUser } from "../../user/useUser";

const usePeriodicNotifications = () => {
  // Get user data and token from useUser hook
  const { token, user } = useUser();

  // State to track if the component just mounted (used for initial fetch)
  const [justMounted, setJustMounted] = useState(true);

  // Get notification-related state and fetch function from useNotifications hook
  const {
    isUnreadNotificationsLoading,
    getUnreadNotifications,
    unreadNotifications,
  } = useNotifications();

  // Ref to store the timestamp of the last successful request
  const lastRequestTimestamp = useRef(null);

  // Ref to store the current timeout ID for cleanup
  const timeoutId = useRef(null);

  // Ref to track if a fetch is currently running (avoid overlapping requests)
  const isFetching = useRef(false);

  // Function to safely fetch unread notifications
  const safeGetUnreadNotifications = useCallback(
    (userId) => {
      if (isFetching.current) return;

      isFetching.current = true;

      getUnreadNotifications(
        userId,
        () => {
          isFetching.current = false;
          lastRequestTimestamp.current = Date.now();
          scheduleNextFetch();
        },
        () => {
          isFetching.current = false;
          lastRequestTimestamp.current = Date.now();
          scheduleNextFetch();
        }
      );
    },
    [getUnreadNotifications]
  );

  // Function to schedule the next fetch with a customizable delay
  const scheduleNextFetch = useCallback(
    (delay = Config.NotificationRequestIntervalMs) => {
      // Clear any existing timeout to prevent multiple overlapping timers
      if (timeoutId.current) clearTimeout(timeoutId.current);

      // Set a new timeout with the specified delay (default is 2 minutes)
      timeoutId.current = setTimeout(() => {
        if (!user || !user.user_id) return;

        const now = Date.now();
        const last = lastRequestTimestamp.current || 0;
        const elapsed = now - last;

        // Calculate remaining time until the full interval (2 minutes)
        const remaining = Config.NotificationRequestIntervalMs - elapsed;

        // If enough time has passed, fetch notifications
        if (elapsed >= Config.NotificationRequestIntervalMs - Config.NotificationAllowedDelayMs) {
          safeGetUnreadNotifications(user.user_id);
        }
        // If triggered too early, reschedule with remaining time
        else if (remaining > 0) {
          scheduleNextFetch(remaining);
        }
      }, delay);
    },
    [safeGetUnreadNotifications, user]
  );

  // Effect for initial fetch when the component mounts
  useEffect(() => {
    if (
      justMounted &&
      token !== null &&
      user !== null &&
      unreadNotifications === null &&
      !isUnreadNotificationsLoading
    ) {
      setJustMounted(false);

      getUnreadNotifications(
        user.user_id,
        () => {
          lastRequestTimestamp.current = Date.now();
          scheduleNextFetch();
        },
        () => {
          lastRequestTimestamp.current = Date.now();
          scheduleNextFetch();
        }
      );
    }
  }, [
    getUnreadNotifications,
    isUnreadNotificationsLoading,
    justMounted,
    unreadNotifications,
    token,
    user,
    scheduleNextFetch,
  ]);

  // Effect to stop polling if the user logs out
  useEffect(() => {
    if (!user && timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  }, [user]);

  // Cleanup effect for when the component unmounts
  useEffect(() => {
    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, []);

  // Return unread notifications for use in components
  return { unreadNotifications };
};

export default usePeriodicNotifications;
