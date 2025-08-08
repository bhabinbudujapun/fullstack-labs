import { useState } from "react";
import { Users } from "lucide-react";
import useUserStore from "../../store/useUserStore";

const ChatList = ({ chats, selectedChat, setSelectedChat, loading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const user = useUserStore((state) => state.user);

  const getChatName = (chat) => {
    if (chat.isGroup) return chat.name;
    const otherParticipant = chat.participants.find((p) => p._id !== user._id);
    return otherParticipant?.username || "Unknown";
  };

  const isChatOnline = (chat) => {
    if (chat.isGroup) return false;
    return chat.participants.find((p) => p._id !== user._id)?.isOnline || false;
  };

  const filteredChats = chats.filter((chat) =>
    getChatName(chat).toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-full md:w-80 border-r border-gray-200 bg-gray-50">
        <div className="p-4 border-b">
          <div className="animate-pulse h-10 bg-gray-300 rounded"></div>
        </div>
        <div className="p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-12 bg-gray-300 rounded mb-2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-80 border-r border-gray-200 bg-gray-50">
      <div className="overflow-y-auto h-full">
        {filteredChats.length === 0 && (
          <p className="p-4 text-gray-500 text-center">No chats found</p>
        )}
        {filteredChats.map((chat) => (
          <div
            key={chat._id}
            onClick={() => setSelectedChat(chat)}
            className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-100 transition-colors ${
              selectedChat?._id === chat._id
                ? "bg-blue-50 border-r-2 border-r-blue-500"
                : ""
            }`}>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {chat.isGroup ? (
                    <Users className="w-6 h-6" />
                  ) : (
                    getChatName(chat).slice(0, 2).toUpperCase()
                  )}
                </div>
                {isChatOnline(chat) && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {getChatName(chat)}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {chat.timestamp}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate">
                    {chat.lastMessage?.text || "No messages"}
                  </p>
                  {chat.unreadCount > 0 && (
                    <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
