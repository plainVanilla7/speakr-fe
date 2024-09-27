// src/App.js
import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./src/redux/store";
import { SocketProvider } from "./src/context/SocketContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "./src/redux/authSlice";
import AppNavigator from "./src/navigation/AppNavigator";

const RootApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadAuthData = async () => {
      const authToken = await AsyncStorage.getItem("authToken");
      const userJson = await AsyncStorage.getItem("user");
      if (authToken && userJson) {
        const user = JSON.parse(userJson);
        dispatch(login({ user, authToken }));
      }
    };
    loadAuthData();
  }, [dispatch]);

  return (
    <SocketProvider>
      <AppNavigator />
    </SocketProvider>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <RootApp />
    </Provider>
  );
}
