// src/redux/chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    chats: [
      { id: "1", user: "John Doe", lastMessage: "Hey, what’s up?" },
      { id: "2", user: "Jane Smith", lastMessage: "See you tomorrow!" },
      { id: "3", user: "Mike Ross", lastMessage: "Can you send the files?" },
      { id: 4, user: "Tata Tibi", lastMessage: "Da permisu' ala?" },
    ],
  },
  reducers: {
    sendMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { sendMessage } = chatSlice.actions;
export default chatSlice.reducer;
