import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, userId: null, authToken: null, fcmToken: null },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.userId = action.payload.userId;
      state.authToken = action.payload.authToken;
      state.fcmToken = action.payload.fcmToken;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
