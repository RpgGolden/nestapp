// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      if (localStorage.getItem("token") !== action.payload) {
        localStorage.setItem("token", action.payload);
      }
    },
    logoutAction: (state) => {
      state.accessToken = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setAccessToken, logoutAction } = authSlice.actions;
export default authSlice.reducer;
