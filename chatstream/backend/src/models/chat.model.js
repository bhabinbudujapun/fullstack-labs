import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    isGroup: {
      type: Boolean,
      default: false,
    },

    name: {
      type: String,
      required: function () {
        return this.isGroup;
      },
    },

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },

    unreadCount: {
      type: Number,
      default: 0,
    },

    avatar: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
