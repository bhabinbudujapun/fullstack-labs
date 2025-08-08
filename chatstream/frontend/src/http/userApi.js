import { api } from "../lib/axios";
import useTokenStore from "../store/useAuthStore";

export const login = async (credentials) => {
  try {
    const response = await api.post("/user/login", credentials);
    const { user, token } = response.data;
    useTokenStore.getState().setToken(token);
    return { user, token };
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
};

export const signup = async (userData) => {
  try {
    const response = await api.post("/user/register", userData);
    const { user, token } = response.data;
    useTokenStore.getState().setToken(token);
    return { user, token };
  } catch (error) {
    throw new Error(error.message || "Signup failed");
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/user/logout");
    useTokenStore.getState().clearToken();
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Logout failed");
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get("/user/list");
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch users");
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch user");
  }
};

export const updateUserOnlineStatus = async (userId, isOnline) => {
  try {
    const response = await api.patch(`/user/${userId}/online`, { isOnline });
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to update online status");
  }
};
