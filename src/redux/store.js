// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    chat: chatReducer,
    auth: authReducer,
  },
});

export default store;
