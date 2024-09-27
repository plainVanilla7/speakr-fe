// src/api/conversationsApi.js

import axios from "axios";
import { API_BASE_URL } from "../config";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const createConversationApi = async (authToken, recipientId) => {
  try {
    const response = await apiClient.post(
      "/conversations",
      { recipientId },
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

export const getConversationApi = async (authToken, conversationId) => {
  try {
    const response = await apiClient.get(`/conversations/${conversationId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
