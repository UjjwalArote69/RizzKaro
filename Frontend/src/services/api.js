import axios from "axios";
import { getToken } from "./auth";
baseURL: import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});



api.interceptors.request.use((config) => {
  const token = getToken();
  console.log("Token from localStorage:", token);
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAIReply = async (inputText, type) => {
  return api.post("/reply", { inputText, type }); // baseURL already includes /api
};

export default api;
