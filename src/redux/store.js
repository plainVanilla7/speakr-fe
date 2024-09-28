// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import authReducer from "./authSlice";
import contactsReducer from "./contactsSlice";

const store = configureStore({
  reducer: {
    chat: chatReducer,
    auth: authReducer,
    contacts: contactsReducer,
  },
});

export default store;
