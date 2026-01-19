import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";

const errorV2Slice = createSlice({
    name: 'errorsV2',
    initialState,
    reducers: {
        addError: (state, action) => {
            state.errorsStack.push(action.payload);
        },
        removeError: (state, action) => {
            state.errorsStack = state.errorsStack.filter(
                error => error.uuid !== action.payload.uuid
            );
        },
    },
});

export default errorV2Slice.reducer;
export const { addError, removeError } = errorV2Slice.actions;
