import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

export const createOrFetchChat = async (req, res) => {
  try {
    const { participants, name, isGroup } = req.body;
    const currentUserId = req.user._id;

    // Ensure the current user is always a participant
    const uniqueParticipants = Array.from(
      new Set([...participants, currentUserId])
    );

    let chat;

    if (!isGroup && uniqueParticipants.length === 2) {
      // Check if a one-to-one chat already exists
      chat = await Chat.findOne({
        participants: { $all: uniqueParticipants },
        isGroup: false,
      });
    }

    if (!chat) {
      // Create new chat if none exists
      chat = await Chat.create({
        participants: uniqueParticipants,
        name,
        isGroup,
      });
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Failed to initiate chat", error });
  }
};

export const getUserChats = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const chats = await Chat.find({ participants: currentUserId })
      .populate("participants", "username")
      .populate({
        path: "lastMessage",
        populate: { path: "sender", select: "username" },
      })
      .sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chats", error });
  }
};

export const getMessagesByChatId = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chatId })
      .populate("sender", "username")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error });
  }
};

export const sendMessageToChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { text } = req.body;
    const senderId = req.user._id;

    const newMessage = await Message.create({
      chatId,
      sender: senderId,
      text,
    });

    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: newMessage._id,
      updatedAt: Date.now(),
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error });
  }
};
