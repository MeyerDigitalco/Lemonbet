import UserStorage from "../localStorage/userStorage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: UserStorage.getToken(),
  user: UserStorage.getUser(),
  isLogInLoading: false,
  isUserInfoUpdateLoading: false,
  isChangePasswordLoading: false,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      UserStorage.setToken(action.payload);
    },
    setUser: (state, action) => {
      state.user = action.payload;
      UserStorage.setUser(action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      UserStorage.removeToken();
    },
    updateUserBalance: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          user_balance: action.payload,
        };
        UserStorage.setUser({
          ...state.user,
          user_balance: action.payload,
        });
      }
    },
    clearUser: (state) => {
      state.user = null;
      UserStorage.removeUser();
    },
    setLogInLoading: (state, action) => {
      state.isLogInLoading = action.payload;
    },
    setUserInfoUpdateLoading: (state, action) => {
      state.isUserInfoUpdateLoading = action.payload;
    },
    setChangePasswordLoading: (state, action) => {
      state.isChangePasswordLoading = action.payload;
    },
  },
});

export default UserSlice.reducer;

export const {
  setToken,
  setUser,
  clearToken,
  clearUser,
  setLogInLoading,
  setUserInfoUpdateLoading,
  setChangePasswordLoading,
  updateUserBalance,
} = UserSlice.actions;

// Selector — now plain JS, no RootState typing
export const selectToken = (state) => state.user.token;
