import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
  isAuthenticated: localStorage.getItem("token") ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state,action) => {
       state.token = action.payload.token;
       state.userId = action.payload.userId;
       state.isAuthenticated = true
    },
    logout: (state) => {
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
        state.isAuthenticated = false
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;