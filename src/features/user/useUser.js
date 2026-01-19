import { useCallback, useContext } from "react";
import axios from "axios";
import Config, { getApiHost, getSiteLabel } from "../../utils/config";
import {
  clearToken,
  clearUser,
  setChangePasswordLoading,
  setLogInLoading,
  setToken,
  setUser,
  setUserInfoUpdateLoading,
} from "./userSlice";
import { useAppDispatch, useAppSelector } from "../../utils/store";
import { useLanguage } from "../localisation/useLanguage";
import { setOutcomeGames } from "../games/gamesSlice";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { callApi } from "../../utils/Utils";
import { PATHS } from "../navigation/paths";
import { enqueueSnackbar } from "notistack";

export const useUser = () => {
  const { setLocalizedError, handleNetworkErrors } = useLanguage();
  const user = useAppSelector((state) => state.user.user ?? null);
  const token = useAppSelector((state) => state.user.token ?? null);

  
  const isLogInLoading = useAppSelector(
    (state) => state.user.isLogInLoading ?? false
  );
  const isUserInfoUpdateLoading = useAppSelector(
    (state) => state.user.isUserInfoUpdateLoading ?? false
  );
  const isChangePasswordLoading = useAppSelector(
    (state) => state.user.isChangePasswordLoading ?? false
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const apiURL = getApiHost();
  const { contextData, updateSession } = useContext(AppContext);

  

  const logIn = useCallback(
    (username, password, onSuccess = () => { }) => {
      if (!apiURL) return;

      const body = {
        username,
        password,
        site_label: getSiteLabel(),
      };
      
      dispatch(setLogInLoading(true));
      localStorage.removeItem(`${Config.localStoragePrefix}autoLogoutTime`);

      const callbackSubmitLogin = (result) => {
        dispatch(setLogInLoading(false));

        if (result && result.status === "success") {
          const user = result.user;
          const token = result.authorization['token'];

          localStorage.setItem("session", JSON.stringify(result));
          updateSession(result);

          if (user) dispatch(setUser(user));
          if (token) dispatch(setToken(token));
          enqueueSnackbar("¡Inicio de sesión exitoso!", {
            variant: "success",
            autoHideDuration: 5000,
            onExited: () => {
            },
          });

          onSuccess();
          //window.location.reload();
        } else if (result && result.status === "country") {
          const error = {"code": 7, "message": "User Outside the Allowed Region"};
          enqueueSnackbar("Usuario fuera de la región permitida.", {
            variant: "error",
            autoHideDuration: 5000,
            onExited: () => {
            },
          });
          setLocalizedError(error);
        } else {
          const error = {"code": 6, "message": "wrong username or password"};
          enqueueSnackbar("¡Error al iniciar sesión! Por favor, compruebe sus credenciales.", {
            variant: "error",
            autoHideDuration: 5000,
            onExited: () => {
            },
          });
          setLocalizedError(error);
        }
        dispatch(setLogInLoading(false)); // ✅ always reset loading
      };

      try {
        callApi(contextData, "POST", "/login/", callbackSubmitLogin, JSON.stringify(body));
      } catch (err) {
        dispatch(setLogInLoading(false));
        enqueueSnackbar("¡Error de red! Por favor, inténtelo de nuevo.", {
          variant: "error",
          autoHideDuration: 5000,
        });
      }
    },
    [apiURL, dispatch, contextData]
  );


  const updateUserInfo = useCallback(
    (newUserInfo) => {
      if (token && user && apiURL) {
        axios.create({ ...Config.axiosConfig });

        const data = new FormData();
        data.append("action", "UpdateUserInformation");
        data.append("token", token);
        if (
          (newUserInfo.user_email && newUserInfo.user_email.trim() !== "") ||
          user.user_email
        )
          data.append(
            "useremail",
            newUserInfo.user_email ?? user.user_email ?? ""
          );
        data.append("userphone", newUserInfo.user_phone ?? "");
        data.append("userfirstname", newUserInfo.user_firstname ?? "");
        data.append("userlastname", newUserInfo.user_lastname ?? "");

        dispatch(setUserInfoUpdateLoading(true));

        axios
          .post(apiURL, data)
          .then((response) => {
            const { success, error, user } = response.data;
            if (success && user)
              dispatch(setUser({ ...newUserInfo, ...user }));
            if (error) setLocalizedError(error);
          })
          .catch((error) => {
            dispatch(setOutcomeGames([]));
            handleNetworkErrors(error);
          })
          .finally(() => {
            dispatch(setUserInfoUpdateLoading(false));
          });
      }
    },
    [apiURL, dispatch, handleNetworkErrors, setLocalizedError, token, user]
  );

  const logOut = useCallback(() => {
    if (token && apiURL) {
      callApi(contextData, "POST", "/logout", (result) => {
        
        if (result.status === "success") {
          setTimeout(() => {
            dispatch(clearUser());
            dispatch(clearToken());
            navigate(PATHS.home, { replace: true });
          }, 200);
        } else {
          dispatch(clearUser());
          dispatch(clearToken());
          dispatch(setOutcomeGames([]));
          const error = {"code": 16, "message": "Action does not exist"};
          handleNetworkErrors(error);
        }
      }, null);
    }
  }, [token, apiURL, navigate, dispatch, setLocalizedError, handleNetworkErrors]);

  const changePassword = useCallback(
    (oldPassword, newPassword, onSuccess = () => { }) => {
      if (token && apiURL) {

        dispatch(setChangePasswordLoading(true));

        let body = {
          "old_password": oldPassword,
          "new_password": newPassword,
        };
        callApi(contextData, "POST", "/change-password/",
          (result) => {
            if (result.status === "0") {
              enqueueSnackbar("La contraseña se ha actualizado correctamente.", {
                variant: "success",
                autoHideDuration: 5000,
                onExited: () => {
                },
              });

              onSuccess();
            }
            else {
              enqueueSnackbar("Hubo un error al cambiar la contraseña.", {
                variant: "error",
                autoHideDuration: 5000,
                onExited: () => {
                },
              });
              const error = { "code": 25, "message": "New password missing" };
              handleNetworkErrors(error);
            }
          }, JSON.stringify(body));
        dispatch(setChangePasswordLoading(false));
      }
    },
    [token, apiURL, dispatch, setLocalizedError, handleNetworkErrors]
  );

  const refreshUserInfo = useCallback(
    (onDone) => {
      if (token && user && apiURL) {
        axios.create({ ...Config.axiosConfig });
        const data = new FormData();
        data.append("action", "GetUserInformation");
        data.append("token", token);

        axios
          .post(apiURL, data)
          .then((response) => {
            const { success, error, user } = response.data;
            onDone?.();
            if (success && user) dispatch(setUser(user));
            if (error) setLocalizedError(error);
          })
          .catch((error) => {
            dispatch(setOutcomeGames([]));
            handleNetworkErrors(error);
          });
      }
    },
    [apiURL, dispatch, handleNetworkErrors, setLocalizedError, token, user]
  );

  const refreshUserBalance = useCallback(() => {
    callApi(contextData, "GET", "/get-user-balance", (result) => {
      const updatedUser = {
        ...user,
        balance: result.balance,
      };
      dispatch(setUser(updatedUser));
    }, null);

  }, [apiURL, dispatch, handleNetworkErrors, setLocalizedError, token, user]);

  return {
    user,
    token,
    logIn,
    updateUserInfo,
    refreshUserInfo,
    refreshUserBalance,
    isLogInLoading,
    isUserInfoUpdateLoading,
    logOut,
    changePassword,
    isChangePasswordLoading,
  };
};
