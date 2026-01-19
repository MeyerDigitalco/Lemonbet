import { useCallback, useState, useMemo } from "react";
import { useSnackbar } from "notistack";
import { useLanguage } from "../../localisation/useLanguage";
import { useUser } from "../useUser";

export const useChangePassword = () => {
  const {
    languagePack: {
      pack: { changePassword: lang }
    }
  } = useLanguage();

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { changePassword, isChangePasswordLoading } = useUser();
  const { enqueueSnackbar } = useSnackbar();

  const sendSnackBar = useCallback(
    (variant, message) => {
      enqueueSnackbar(message, { variant });
    },
    [enqueueSnackbar]
  );

  const oldPasswordError = useMemo(() => {
    if (!oldPassword) {
      return lang.oldPasswordRequiredMessage;
    }
    return null;
  }, [lang.oldPasswordRequiredMessage, oldPassword]);

  const passwordError = useMemo(() => {
    const regex = /^[a-zA-Z0-9_.!?]{5,18}$/;
    if (password && !regex.test(password)) {
      return lang.passwordErrorMessage;
    }
    return null;
  }, [lang.passwordErrorMessage, password]);

  const passwordConfirmError = useMemo(() => {
    if (passwordConfirm && passwordConfirm !== password) {
      return lang.passwordConfirmNotMatchMessage;
    }
    return null;
  }, [passwordConfirm, password, lang.passwordConfirmNotMatchMessage]);

  const isFormValid = useMemo(() => {
    return (
      !oldPasswordError &&
      !passwordError &&
      !passwordConfirmError &&
      !!oldPassword &&
      !!password &&
      !!passwordConfirm
    );
  }, [
    oldPasswordError,
    passwordError,
    passwordConfirmError,
    oldPassword,
    password,
    passwordConfirm
  ]);

  const submitPasswordHandler = useCallback(
    (onDone) => {
      if (isFormValid) {
        changePassword(oldPassword, password, () => {
          sendSnackBar("success", lang.passwordUpdatedMessage);
          if (onDone) onDone();
        });
      }
    },
    [
      isFormValid,
      changePassword,
      oldPassword,
      password,
      sendSnackBar,
      lang.passwordUpdatedMessage
    ]
  );

  return {
    oldPassword,
    password,
    passwordConfirm,
    setOldPassword,
    setPassword,
    setPasswordConfirm,
    submitPasswordHandler,
    isChangePasswordLoading,
    oldPasswordError,
    passwordError,
    passwordConfirmError,
    isFormValid
  };
};

export default useChangePassword;
