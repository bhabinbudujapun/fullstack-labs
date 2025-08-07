import User from "../models/user.model.js";
import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

// Create or fetch chat
export const createOrFetchChat = async (req, res) => {
  try {
    const { participantIds, isGroup, name, avatar } = req.body;
    const userId = req.user.userId;

    const participants = [...new Set([userId, ...(participantIds || [])])];
    let chat;
    if (!isGroup) {
      chat = await Chat.findOne({
        isGroup: false,
        participants: { $all: participants, $size: participants.length },
      });
    }
    if (!chat) {
      chat = new Chat({
        participants,
        isGroup: isGroup || false,
        name: isGroup ? name : undefined,
        avatar: isGroup ? avatar : undefined,
      });
      await chat.save();
    }
    await chat.populate("participants", "username avatar isOnline");
    res.status(201).json(chat);
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user's chats
export const getUserChats = async (req, res) => {
  try {
    const userId = req.user.userId;
    const chats = await Chat.find({ participants: userId })
      .populate("participants", "username avatar isOnline")
      .populate("lastMessage");
    res.status(200).json(chats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update chat
export const updateChat = async (req, res) => {
  try {
    const { unreadCount, avatar, name } = req.body;
    const chat = await Chat.findByIdAndUpdate(
      req.params.chatId,
      { unreadCount, avatar, name },
      { new: true }
    ).populate("participants", "username avatar isOnline");
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.status(200).json(chat);
  } catch (error) {
    console.error("Error updating chat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get messages by chatId
export const getMessagesByChatId = async (req, res) => {
  try {
    const userId = req.user.userId;
    const chat = await Chat.findById(req.params.chatId);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    const messages = await Message.find({ chatId: req.params.chatId })
      .sort({ createdAt: 1 })
      .populate("sender", "username avatar isOnline")
      .lean();

    const messagesWithStatus = messages.map((message) => ({
      ...message,
      isMine: message.sender._id.toString() === userId.toString(),
      isReadByMe: message.readBy.includes(userId),
    }));

    res.status(200).json({
      messages: messagesWithStatus,
      chatId: chat._id,
      totalMessages: messages.length,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Send message to chat
export const sendMessageToChat = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user.userId;
    const chatId = req.params.chatId;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Message text is required" });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    const user = await User.findById(userId).select("username");
    const message = new Message({
      chatId,
      sender: userId,
      text: text.trim(),
      senderName: user.username,
      readBy: [userId],
    });
    await message.save();

    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: message._id,
      unreadCount: chat.unreadCount + 1,
      updatedAt: new Date(),
    });

    // Socket.IO for real-time
    const io = req.app.get("io");
    const sockets = req.app.get("sockets") || {};
    chat.participants.forEach((participantId) => {
      const socketId = sockets[participantId.toString()];
      if (socketId && participantId.toString() !== userId.toString()) {
        io.to(socketId).emit("newMessage", {
          ...message.toObject(),
          sender: { _id: userId, username: user.username },
          chatId,
        });
      }
    });

    await message.populate("sender", "username avatar isOnline");
    res.status(201).json({ message, chatId });
  } catch (error) {
    console.error("Error sending message:", error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation error", details: error.message });
    }
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid chat ID" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

// Mark message as read
export const markMessagesAsRead = async (req, res) => {
  try {
    const userId = req.user.userId;
    const message = await Message.findById(req.params.messageId);
    if (!message) return res.status(404).json({ message: "Message not found" });

    if (!message.readBy.includes(userId)) {
      message.readBy.push(userId);
      await message.save();
      await Chat.findByIdAndUpdate(message.chatId, {
        $inc: { unreadCount: -1 },
      });
    }

    await message.populate("sender", "username avatar isOnline");
    res.status(200).json(message);
  } catch (error) {
    console.error("Error marking message as read:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
