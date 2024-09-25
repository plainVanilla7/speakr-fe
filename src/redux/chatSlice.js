import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: {
      "John Doe": [
        { sender: "John Doe", text: "Hello!", timestamp: "10:00 AM" },
        { sender: "You", text: "Hi, John!", timestamp: "10:01 AM" },
      ],
      "Jane Doe": [
        { sender: "Jane Doe", text: "Good morning!", timestamp: "9:00 AM" },
        { sender: "You", text: "Good morning, Jane!", timestamp: "9:01 AM" },
      ],
      "Mike Roll": [
        {
          sender: "Mike Roll",
          text: "It’s been a while!",
          timestamp: "8:00 AM",
        },
        { sender: "You", text: "Yes, Mike, long time!", timestamp: "8:02 AM" },
      ],
      "Emma Rock": [
        { sender: "Emma Rock", text: "Hi! How are you?", timestamp: "7:00 AM" },
        { sender: "You", text: "I'm good, Emma!", timestamp: "7:01 AM" },
      ],
      "Sophia State": [
        { sender: "Sophia State", text: "Hey there!", timestamp: "6:00 AM" },
        { sender: "You", text: "Hello, Sophia!", timestamp: "6:01 AM" },
      ],
    },
  },
  reducers: {
    sendMessage: (state, action) => {
      const { username, message } = action.payload;
      if (!state.conversations[username]) {
        state.conversations[username] = [];
      }
      state.conversations[username].push(message);
    },

    deleteConversation: (state, action) => {
      const { username } = action.payload;
      delete state.conversations[username];
    },

    deleteMessage: (state, action) => {
      const { username, index } = action.payload;
      state.conversations[username].splice(index, 1);
    },
  },
});

export const { sendMessage } = chatSlice.actions;
export default chatSlice.reducer;
