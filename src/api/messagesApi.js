// src/api/messagesApi.js

import axios from "axios";
import { API_BASE_URL } from "../config";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const sendMessageApi = async (authToken, conversationId, text) => {
  try {
    const response = await apiClient.post(
      "/messages",
      { conversationId, text },
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

export const getMessagesApi = async (authToken, conversationId) => {
  try {
    const response = await apiClient.get(`/messages/${conversationId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
