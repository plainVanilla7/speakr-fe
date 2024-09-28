// src/redux/contactsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getContactsApi, addContactApi, searchUsersApi } from "../api/usersApi";

// Async thunk to fetch contacts
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, { getState, rejectWithValue }) => {
    const { authToken } = getState().auth;
    try {
      const data = await getContactsApi(authToken);
      return data;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch contacts" },
      );
    }
  },
);

// Async thunk to add a contact
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contactId, { getState, rejectWithValue }) => {
    const { authToken } = getState().auth;
    try {
      const response = await addContactApi(authToken, contactId);
      return { contactId };
    } catch (error) {
      console.error("Error adding contact:", error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to add contact" },
      );
    }
  },
);

// Async thunk to search users
export const searchUsers = createAsyncThunk(
  "contacts/searchUsers",
  async (query, { getState, rejectWithValue }) => {
    const { authToken } = getState().auth;
    try {
      const data = await searchUsersApi(authToken, query);
      return data;
    } catch (error) {
      console.error("Error searching users:", error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to search users" },
      );
    }
  },
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    loading: false,
    error: null,
    searchResults: [],
    searchLoading: false,
    searchError: null,
  },
  reducers: {
    clearSearchResults(state) {
      state.searchResults = [];
      state.searchError = null;
      state.searchLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Contacts
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Failed to fetch contacts";
      })

      // Add Contact
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally, you can fetch contacts again or add the new contact to the contacts array
        // For simplicity, we'll assume the backend updates the contacts list, and we refetch
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Failed to add contact";
      })

      // Search Users
      .addCase(searchUsers.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload.message || "Failed to search users";
      });
  },
});

export const { clearSearchResults } = contactsSlice.actions;

export default contactsSlice.reducer;
