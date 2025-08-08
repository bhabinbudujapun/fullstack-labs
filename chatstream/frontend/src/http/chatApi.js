import { api } from "../lib/axios";

export const sendMessage = async (messageData) => {
  try {
    console.log("Sending message with data:", messageData);
    const response = await api.post(`/chat/${messageData.chatId}/messages`, {
      text: messageData.text,
    });
    return response.data;
  } catch (error) {
    console.error("Send message error:", error.message);
    throw new Error(error.message || "Failed to send message");
  }
};

export const getMessages = async (chatId) => {
  try {
    console.log("Fetching messages for chat ID:", chatId);
    const response = await api.get(`/chat/${chatId}/messages`);
    return response.data;
  } catch (error) {
    console.error("Fetch messages error:", error.message);
    throw new Error(error.message || "Failed to fetch messages");
  }
};

export const getUserChats = async () => {
  try {
    console.log("Fetching user chats");
    const response = await api.get("/chat");
    return response.data;
  } catch (error) {
    console.error("Fetch chats error:", error.message);
    throw new Error(error.message || "Failed to fetch chats");
  }
};

export const createOrFetchChat = async (chatData) => {
  try {
    console.log("Creating/fetching chat with data:", chatData);
    const response = await api.post("/chat", chatData);
    return response.data;
  } catch (error) {
    console.error("Create/fetch chat error:", error.message);
    throw new Error(error.message || "Failed to create/fetch chat");
  }
};

export const markMessageAsRead = async (chatId, messageId) => {
  try {
    console.log("Marking message as read:", messageId);
    const response = await api.patch(
      `/chat/${chatId}/messages/${messageId}/read`
    );
    return response.data;
  } catch (error) {
    console.error("Mark message as read error:", error.message);
    throw new Error(error.message || "Failed to mark message as read");
  }
};
