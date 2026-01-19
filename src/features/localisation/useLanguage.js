import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/store";
import { changeLang } from "./LanguageSlice";
import langStorage from "../localStorage/langStorage";
import { getLangPackByName } from "./languageFuncs";
import { addNewError } from "../errorSlice";
import { useSnackbar } from "notistack";

export const useLanguage = () => {
  const dispatch = useAppDispatch();
  const languagePack = useAppSelector((state) => state.lang.languagePack);
  const { enqueueSnackbar } = useSnackbar();

  const sendSnackBar = useCallback(
    (variant, message) => {
      enqueueSnackbar(message, { variant });
    },
    [enqueueSnackbar]
  );

  const switchLanguageFromStore = useCallback(() => {
    const lang = langStorage.getLang();
    if (lang) {
      const langPack = getLangPackByName(lang);
      dispatch(changeLang(langPack));
      document.documentElement.lang = langPack.langShort;
    }
  }, [dispatch]);

  const switchLanguage = useCallback(
    (lang) => {
      const langPack = getLangPackByName(lang);
      dispatch(changeLang(langPack));
      langStorage.setLang(lang);
      document.documentElement.lang = langPack.langShort;
    },
    [dispatch]
  );

  const setLocalizedError = useCallback(
    (error) => {
      const errorMessages = JSON.parse(
        JSON.stringify(languagePack.pack.errorMessages)
      );
      const errorCode = error.code?.toString?.();

      if (errorMessages.hasOwnProperty(errorCode)) {
        dispatch(
          addNewError({
            ...error,
            message: errorMessages[errorCode],
          })
        );
      } else {
        dispatch(addNewError(error));
      }
    },
    [dispatch, languagePack.pack.errorMessages]
  );

  const handleNetworkErrors = useCallback(
    (error) => {
      // if (axios.isAxiosError(error)) {
      //   if (error.code === "ERR_NETWORK") {
      //     sendSnackBar(
      //       "error",
      //       languagePack.pack.internalErrorMessages.networkError
      //     );
      //   } else {
      //     console.error("axios error", error);
      //   }
      // } else {
      //   console.error("not axios error", error);
      // }
    },
    [languagePack, sendSnackBar]
  );

  return {
    switchLanguageFromStore,
    languagePack,
    switchLanguage,
    setLocalizedError,
    handleNetworkErrors,
  };
};
