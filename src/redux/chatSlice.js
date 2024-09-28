import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchConversations, fetchMessages, sendMessageApi } from "../api/chat";

// Thunk to load conversations
export const loadConversations = createAsyncThunk(
  "chat/loadConversations",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchConversations();
      return data.map((conversation) => ({
        ...conversation,
        id: conversation._id || conversation.id, // Ensure correct mapping of id
      }));
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

// Thunk to load messages for a conversation
export const loadMessages = createAsyncThunk(
  "chat/loadMessages",
  async (conversationId, { rejectWithValue }) => {
    try {
      const data = await fetchMessages(conversationId);
      return { conversationId, messages: data };
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

// Thunk to send a message
export const sendMessageThunk = createAsyncThunk(
  "chat/sendMessage",
  async ({ conversationId, message }, { rejectWithValue }) => {
    try {
      const data = await sendMessageApi(conversationId, message);
      return { conversationId, message: data };
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: {},
    loading: false,
    error: null,
  },
  reducers: {
    receiveMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      if (!state.conversations[conversationId]) {
        state.conversations[conversationId] = {
          messages: [],
          lastReadMessageIndex: -1,
        };
      }
      state.conversations[conversationId].messages.push(message);
    },
    markConversationAsRead: (state, action) => {
      const { conversationId } = action.payload;
      const conversation = state.conversations[conversationId];
      if (conversation) {
        conversation.lastReadMessageIndex = conversation.messages.length - 1;
      }
    },
    deleteConversation: (state, action) => {
      const { conversationId } = action.payload;
      delete state.conversations[conversationId];
    },
    deleteMessage: (state, action) => {
      const { conversationId, messageId } = action.payload;
      const conversation = state.conversations[conversationId];
      if (conversation) {
        conversation.messages = conversation.messages.filter(
          (message) => message.id !== messageId,
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loadConversations
      .addCase(loadConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload.reduce((acc, conversation) => {
          acc[conversation.id] = conversation;
          return acc;
        }, {});
      })
      .addCase(loadConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error loading conversations";
      })
      // Handle loadMessages
      .addCase(loadMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMessages.fulfilled, (state, action) => {
        state.loading = false;
        const { conversationId, messages } = action.payload;
        if (!state.conversations[conversationId]) {
          state.conversations[conversationId] = {
            messages: [],
            lastReadMessageIndex: -1,
          };
        }
        state.conversations[conversationId].messages = messages;
      })
      .addCase(loadMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error loading messages";
      })
      // Handle sendMessageThunk
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        const { conversationId, message } = action.payload;
        if (!state.conversations[conversationId]) {
          state.conversations[conversationId] = {
            messages: [],
            lastReadMessageIndex: -1,
          };
        }
        state.conversations[conversationId].messages.push(message);
      });
  },
});

export const {
  receiveMessage,
  markConversationAsRead,
  deleteConversation,
  deleteMessage,
} = chatSlice.actions;
export default chatSlice.reducer;
