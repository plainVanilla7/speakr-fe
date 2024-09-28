// src/api/authApi.js

import axios from "axios";
import { API_BASE_URL } from "../config";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const loginApi = async (username, password) => {
  try {
    const response = await apiClient.post("/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerApi = async (username, password, email) => {
  try {
    const payload = { username, password };
    if (email) {
      payload.email = email;
    }
    const response = await apiClient.post("/auth/register", payload);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
