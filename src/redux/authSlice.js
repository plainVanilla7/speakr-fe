import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, authToken: null },
  reducers: {
    login: (state, action) => {
      const { user, authToken } = action.payload;
      state.user = user;
      state.authToken = authToken;
      AsyncStorage.setItem("authToken", authToken);
      AsyncStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.authToken = null;
      AsyncStorage.removeItem("authToken");
      AsyncStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
