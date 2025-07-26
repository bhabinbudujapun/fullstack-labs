import express from "express";
import checkAccessToken from "../middlewares/auth.middleware.js";
import { sendMessage, getMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send/:id", checkAccessToken, sendMessage);

router.get("/:chatId", checkAccessToken, getMessages);

export default router;
