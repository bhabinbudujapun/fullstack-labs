import express from "express";
import checkAccessToken from "../middlewares/auth.middleware.js";
import {
  createOrFetchChat,
  getUserChats,
  getMessagesByChatId,
  sendMessageToChat,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.use(checkAccessToken);

router.post("/", createOrFetchChat);

router.get("/", getUserChats);

router.get("/:chatId/messages", getMessagesByChatId);

router.post("/:chatId/messages", sendMessageToChat);

export default router;
