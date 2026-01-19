export const chunkArray = (array, chunkSize) => {
  return Array.from(
    { length: Math.ceil(array.length / chunkSize) },
    (_, index) => array.slice(index * chunkSize, index * chunkSize + chunkSize)
  );
};

// Email validation function
export const validateEmail = (email, emailIsRequiredMess, notValidEmail) => {
  if (!email) {
    return `${emailIsRequiredMess}`;
  }
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    return `${notValidEmail}`;
  }
  return ""; // Empty string means validation passed
};

export const convertCentsToCurrencyString = (userBalance) => {
  //let result;
  const result = Number(userBalance).toFixed(2);

  //const b = userBalance;
  //const b = Math.round(userBalance * 100) / 100;

  // if (b.toString().includes(".")) {
  //   const parts = b.toString().split(".");
  //   if (parts[1].length < 2) {
  //     parts[1] = parts[1] + "0";
  //     if (parts[1].length < 2) {
  //       parts[1] = parts[1] + "0";
  //     }
  //   }
  //   result = parts.join(".");
  // } else {
  //   result = b.toString() + ".00";
  // }

  return result;
};

export const convertStringCurrencyToCents = (currency) => {
  if (currency.replace(",", ".").includes(".")) {
    const parts = currency.replace(",", ".").split(".");
    parts[parts.length - 1] = parts[parts.length - 1]
      .slice(0, 2)
      .padEnd(2, "0");
    return parseInt(parts.join(""));
  } else {
    return parseInt(currency + "00");
  }
};

export const getNumberParam = (paramValue) => {
  if (paramValue && !isNaN(Number(paramValue))) {
    return Number(paramValue);
  } else {
    return null;
  }
};

/**
 * Converts Unix timestamp to a compact formatted local date and time string.
 * @param unixTime - Unix timestamp (in seconds).
 * @returns Formatted local date and time string in the format "DD.MM.YYYY HH:mm:ss".
 */
export const convertUnixToCompactLocaleDate = (unixTime) => {
  const date = new Date(unixTime * 1000);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formattedDate = date.toLocaleString(undefined, options);

  const day = formattedDate.slice(0, 2);
  const month = formattedDate.slice(3, 5);
  const year = formattedDate.slice(6, 10);
  const time = formattedDate.slice(12);

  return `${day}.${month}.${year} ${time}`;
};

export const separateDateTime = (dateTimeString) => {
  const parts = dateTimeString.split(" ");
  parts[1] = parts[1].split(":").slice(0, 2).join(":");
  return {
    date: parts[0],
    time: parts[1],
  };
};

export const normalizePath = (path) => path.replace(/\/+$/, "");

export const getProductStage = () => {
  const domain = window.location.hostname;

  if (domain === "localhost") {
    const envDomain = import.meta.env.VITE_APP_CURRENT_DOMAIN;

    if (envDomain === "saltalabanca.net") {
      return "production";
    }

    if (envDomain === "staging.saltalabanca.net") {
      return "staging";
    }

    return "local";
  }

  if (domain === "saltalabanca.net") {
    return "production";
  }

  if (domain === "staging.saltalabanca.net") {
    return "staging";
  }

  return "local";
};

export const getDeviceType = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  if (/mobile|android|iphone|ipad|tablet/i.test(userAgent)) {
    return "mobile";
  }

  return "desktop";
};
