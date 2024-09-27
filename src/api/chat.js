// src/api/chatApi.js
import axios from "axios";
import { API_BASE_URL } from "../config";
import { getAuthToken } from "../utils/auth"; // Function to get auth token from AsyncStorage

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the auth token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Fetch all conversations
export const fetchConversations = async () => {
  const response = await apiClient.get("/conversations");
  return response.data;
};

// Fetch messages for a specific conversation
export const fetchMessages = async (conversationId) => {
  const response = await apiClient.get(`/messages/${conversationId}`);
  return response.data;
};

// Send a new message
export const sendMessageApi = async (conversationId, message) => {
  const response = await apiClient.post(`/messages/${conversationId}`, {
    message,
  });
  return response.data;
};
