import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/store";
import { removeError } from "../errorV2Slice";
import { enqueueSnackbar } from "notistack";

export const useErrorHandler = () => {
  const dispatch = useAppDispatch();
  const errorsStack = useAppSelector((state) => state.errorsV2.errorsStack);

  const modalError =
    errorsStack.find((error) => error.displayMethod === "modal") || null;

  useEffect(() => {
    const toastError = errorsStack.find(
      (error) => error.displayMethod === "toast"
    );
    if (toastError) {
      enqueueSnackbar(`${toastError.code}: ${toastError.message}`, {
        variant: "error",
        autoHideDuration: 5000,
      });
      dispatch(removeError(toastError));
    }
  }, [errorsStack, dispatch]);

  return {
    modalDisplay: modalError,
  };
};
