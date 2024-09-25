import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: {
      "John Doe": {
        messages: [
          { sender: "John Doe", text: "Hello!", timestamp: "10:00 AM" },
          { sender: "You", text: "Hi, John!", timestamp: "10:01 AM" },
        ],
        lastReadMessageIndex: 1,
      },
      "Jane Doe": {
        messages: [
          { sender: "Jane Doe", text: "Hey!", timestamp: "10:00 AM" },
          { sender: "You", text: "Hi, Jane!", timestamp: "10:01 AM" },
        ],
        lastReadMessageIndex: 1,
      },
    },
  },
  reducers: {
    sendMessage: (state, action) => {
      const { username, message } = action.payload;
      if (!state.conversations[username]) {
        state.conversations[username] = {
          messages: [],
          lastReadMessageIndex: -1,
        };
      }
      state.conversations[username].messages.push(message);
    },

    deleteConversation: (state, action) => {
      const { username } = action.payload;
      delete state.conversations[username];
    },

    deleteMessage: (state, action) => {
      const { username, index } = action.payload;
      state.conversations[username].splice(index, 1);
    },

    markConversationAsRead: (state, action) => {
      const { username } = action.payload;
      const conversation = state.conversations[username];
      if (conversation) {
        conversation.lastReadMessageIndex = conversation.messages.length - 1;
      }
    },
  },
});

export const {
  sendMessage,
  markConversationAsRead,
  deleteMessage,
  deleteConversation,
} = chatSlice.actions;
export default chatSlice.reducer;
