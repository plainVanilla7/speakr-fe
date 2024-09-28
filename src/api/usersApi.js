// src/api/usersApi.js

import axios from "axios";
import { API_BASE_URL } from "../config";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Fetch contacts
export const getContactsApi = async (authToken) => {
  try {
    const response = await apiClient.get("/users/contacts", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add a new contact
export const addContactApi = async (authToken, contactId) => {
  try {
    const response = await apiClient.post(
      "/users/contacts",
      { contactId },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Search users
export const searchUsersApi = async (authToken, query) => {
  try {
    const response = await apiClient.get("/users/search", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      params: {
        query,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
