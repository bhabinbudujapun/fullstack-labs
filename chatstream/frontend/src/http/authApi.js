import { api } from "../lib/axios";
import useTokenStore from "../store/useAuthStore";

export const login = async (credentials) => {
  console.log("Sending login request with credentials:", credentials);
  const response = await api.post("/user/login", credentials);
  return response.data;
};

export const singup = async (userData) => {
  console.log("Sending signup request with data:", userData);
  const response = await api.post("/user/register", userData);
  return response.data;
};

export const logout = async () => {
  useTokenStore.getState().clearToken();
  return { message: "Logged out successfully" };
};
