import { useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import useUserStore from "../../store/useUserStore";

const ChatBox = ({
  selectedChat,
  messages,
  onSendMessage,
  newMessage,
  setNewMessage,
  loading,
}) => {
  const messagesEndRef = useRef(null);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim() && onSendMessage) {
      onSendMessage(e);
    }
  };

  if (!selectedChat) {
    return (
      <div className="md:w-2/4 w-full flex items-center justify-center text-gray-400">
        Select a chat to start messaging.
      </div>
    );
  }

  return (
    <div className="md:w-2/4 w-full flex flex-col justify-between p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {selectedChat.isGroup
            ? selectedChat.name
            : selectedChat.participants.find((p) => p._id !== user._id)
                ?.username || "Unknown"}
        </h2>
      </div>
      <div className="overflow-y-auto space-y-4 pr-2 flex-1">
        {loading ? (
          <div className="text-center text-gray-400">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-400">No messages yet</div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${
                msg.isMine ? "justify-end" : "justify-start"
              }`}>
              <div className="flex items-start space-x-2 max-w-[75%]">
                {!msg.isMine && (
                  <img
                    src={msg.sender.avatar || "default-avatar.png"}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div>
                  <p className="text-sm text-gray-500">{msg.senderName}</p>
                  <div
                    className={`px-4 py-3 shadow-sm rounded-3xl ${
                      msg.isMine
                        ? "bg-blue-500 text-white rounded-br-sm"
                        : "bg-gray-300 text-gray-800 rounded-bl-sm"
                    }`}>
                    {msg.text}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDistanceToNow(new Date(msg.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                  <p className="text-xs text-gray-400">
                    {msg.isReadByMe ? "Read" : "Unread"}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <form className="pt-4 flex" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type your message here..."
          className="w-full px-4 py-3 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={!selectedChat}
        />
        <button
          type="submit"
          className="ml-2 px-6 py-3 rounded-full bg-blue-500 text-white font-semibold shadow"
          disabled={!newMessage.trim() || !selectedChat}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
