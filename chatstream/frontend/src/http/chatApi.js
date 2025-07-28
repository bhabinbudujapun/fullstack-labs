import { api } from "../lib/axios";

export const sendMessage = async (messageData) => {
  console.log("Sending message with data:", messageData);
  const response = await api.post(`/send/${messageData.receiverId}`, {
    text: messageData.text,
  });
  return response.data;
};

export const getMessage = async (chatId) => {
  console.log("Fetching messages for chat ID:", chatId);
  const response = await api.get(`/${chatId}`);
  return response.data;
};
