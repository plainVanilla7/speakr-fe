// src/contexts/SocketContext.js
import React, { createContext, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { SOCKET_SERVER_URL } from "../config";
import { receiveMessage } from "../redux/chatSlice";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const authToken = useSelector((state) => state.auth.authToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authToken) {
      socketRef.current = io(SOCKET_SERVER_URL, {
        auth: {
          token: authToken,
        },
      });

      socketRef.current.on("connect", () => {
        console.log("Connected to Socket.IO server");
      });

      socketRef.current.on("message", (data) => {
        dispatch(receiveMessage(data));
      });

      // Handle disconnection
      socketRef.current.on("disconnect", () => {
        console.log("Disconnected from Socket.IO server");
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [authToken, dispatch]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};
