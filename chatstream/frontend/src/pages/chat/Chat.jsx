import {
  getUserChats,
  getMessages,
  sendMessage,
  createOrFetchChat,
  markMessageAsRead,
} from "../../http/chatApi";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { getAllUsers } from "../../http/userApi";
import useUserStore from "../../store/useUserStore";
import ChatBox from "../../components/chat/chatBox";
import useTokenStore from "../../store/useAuthStore";
import ChatList from "../../components/chat/chatList";
import ChatInfo from "../../components/chat/chatInfo";
// import io from "socket.io-client";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingChats, setLoadingChats] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState(null);

  const user = useUserStore((state) => state.user);
  const { token } = useTokenStore();
  // const socketRef = useRef(null);

  // Initialize Socket.IO
  // useEffect(() => {
  //   socketRef.current = io(
  //     import.meta.env.VITE_API_BACKEND_URL || "http://localhost:3000",
  //     {
  //       auth: { token },
  //     }
  //   );

  //   socketRef.current.on("newMessage", (message) => {
  //     if (message.chatId === selectedChat?._id) {
  //       setMessages((prev) => [
  //         ...prev,
  //         {
  //           ...message,
  //           isMine: message.sender._id === user._id,
  //           isReadByMe: message.readBy.includes(user._id),
  //         },
  //       ]);
  //     }
  //     setChats((prev) =>
  //       prev.map((chat) =>
  //         chat._id === message.chatId
  //           ? {
  //               ...chat,
  //               lastMessage: { _id: message._id, text: message.text },
  //               timestamp: formatDistanceToNow(new Date(), { addSuffix: true }),
  //               unreadCount: chat.unreadCount + 1,
  //             }
  //           : chat
  //       )
  //     );
  //   });

  //   return () => {
  //     socketRef.current.disconnect();
  //   };
  // }, [selectedChat, user._id, token]);

  // Fetch chats
  useEffect(() => {
    setLoadingChats(true);
    getUserChats()
      .then((data) => {
        setChats(data);
        setLoadingChats(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoadingChats(false);
      });
  }, []);

  // Fetch users
  useEffect(() => {
    getAllUsers()
      .then((data) => setUsers(data))
      .catch((error) => setError(error.message));
  }, []);

  // Fetch messages for selected chat
  useEffect(() => {
    if (!selectedChat) return;
    setLoadingMessages(true);
    getMessages(selectedChat._id)
      .then((data) => {
        setMessages(data.messages);
        data.messages.forEach((msg) => {
          if (!msg.isReadByMe && !msg.isMine) {
            markMessageAsRead(selectedChat._id, msg._id);
          }
        });
        setLoadingMessages(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoadingMessages(false);
      });
  }, [selectedChat]);

  // Start new chat
  const handleStartChat = async (userId) => {
    try {
      const chat = await createOrFetchChat({ participantIds: [userId] });
      setChats((prev) => {
        if (!prev.find((c) => c._id === chat._id)) {
          return [...prev, chat];
        }
        return prev;
      });
      setSelectedChat(chat);
    } catch (error) {
      setError(error.message);
    }
  };

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;
    try {
      const data = await sendMessage({
        chatId: selectedChat._id,
        text: newMessage,
      });
      const newMsg = data.message;
      setMessages((prev) => [...prev, { ...newMsg, isMine: true }]);
      setChats((prev) =>
        prev.map((chat) =>
          chat._id === selectedChat._id
            ? {
                ...chat,
                lastMessage: { _id: newMsg._id, text: newMsg.text },
                timestamp: formatDistanceToNow(new Date(), { addSuffix: true }),
                unreadCount: chat.unreadCount + 1,
              }
            : chat
        )
      );
      setNewMessage("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4 pb-8">
      <div className="container mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-2xl font-bold text-gray-800">ChatStream</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-semibold">{user?.username}</span>
            <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
              {user?.username?.slice(0, 2).toUpperCase()}
            </div>
          </div>
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center p-4">{error}</p>
        )}
        <div className="flex flex-col md:flex-row h-[75vh]">
          <div className="w-full md:w-1/3 border-r p-4">
            <h3 className="text-lg font-semibold mb-4">Users</h3>
            <ul>
              {users.map((u) => (
                <li
                  key={u._id}
                  onClick={() => handleStartChat(u._id)}
                  className="p-2 cursor-pointer hover:bg-indigo-100 rounded">
                  <div className="flex items-center">
                    <img
                      src={u.avatar || "default-avatar.png"}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <p>
                      {u.username}{" "}
                      {u.isOnline && <span className="text-green-500">●</span>}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold mt-4 mb-2">Chats</h3>
            <ChatList
              chats={chats}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              loading={loadingChats}
            />
          </div>
          <ChatBox
            selectedChat={selectedChat}
            messages={messages}
            onSendMessage={handleSendMessage}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            loading={loadingMessages}
          />
          <ChatInfo selectedChat={selectedChat} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
