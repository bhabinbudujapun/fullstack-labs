import express from "express";
import checkAccessToken from "../middlewares/auth.middleware.js";
import {
  createOrFetchChat,
  getUserChats,
  getMessagesByChatId,
  sendMessageToChat,
  updateChat,
  markMessagesAsRead,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.use(checkAccessToken);

router.post("/", createOrFetchChat); // Create/fetch chat

router.get("/", getUserChats); // Get user's chats

router.patch("/:chatId", updateChat); // Update chat metadata

router.get("/:chatId/messages", getMessagesByChatId); // Fetch messages

router.post("/:chatId/messages", sendMessageToChat); // Send message

router.patch("/:chatId/messages/:messageId/read", markMessagesAsRead); // Mark message as read

export default router;
