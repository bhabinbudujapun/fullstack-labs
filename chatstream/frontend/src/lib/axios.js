import axios from "axios";
import useTokenStore from "../store/useAuthStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
