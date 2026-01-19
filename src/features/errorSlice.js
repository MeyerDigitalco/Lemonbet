import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  apiError: null,
  warningsChannel: [],
};

// Add all error codes which have warning-only type
const warningTypeErrorCodes = [];

export const ErrorSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    addNewError: (state, action) => {
      const errorObj = action.payload;
      if (warningTypeErrorCodes.includes(errorObj.code)) {
        const warningObj = {
          ...errorObj,
          fired: false,
          localId: uuidv4(),
        };
        state.warningsChannel = [warningObj, ...state.warningsChannel];
      } else {
        state.apiError = errorObj;
      }
    },
    removeError: (state) => {
      state.apiError = null;
    },
    deleteOneWarning: (state, action) => {
      const { localId } = action.payload;
      state.warningsChannel = state.warningsChannel.filter(
        (warning) => warning.localId !== localId
      );
    },
    clearAllWarnings: (state) => {
      state.warningsChannel = [];
    },
  },
});

export default ErrorSlice.reducer;

export const { addNewError, removeError, deleteOneWarning, clearAllWarnings } = ErrorSlice.actions;
