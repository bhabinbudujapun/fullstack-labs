import Message from "../models/message.model.js";
import Chat from "../models/chat.model.js";

const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const { receiverId } = req.params;
    const senderId = req.user._id;

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      text,
    });

    let chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      chat = new Chat({
        participants: [senderId, receiverId],
      });
    }

    const newChatMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      text,
    });

    await Promise.all([
      newMessage.save(),
      newChatMessage.save(),
      Chat.findByIdAndUpdate(
        chat._id,
        {
          $push: { messages: newMessage._id },
          lastMessage: newMessage._id,
        },
        { new: true }
      ),
    ]);

    const receiverSocketId = req.app.get("sockets")[receiverId];
    if (receiverSocketId) {
      req.app.get("io").to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user._id;

    const chat = await Chat.findOne({
      participants: { $all: [userId, chatId] },
    });

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    const messages = await Message.find({
      _id: { $in: chat.messages },
    })
      .sort({ createdAt: 1 })
      .populate("sender", "username")
      .populate("receiver", "username");
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password -email -createdAt -updatedAt");

    res.status(200).json(filteredUser);
  } catch (error) {
    console.error("Error fetching user chats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { sendMessage, getMessages, getAllUser };