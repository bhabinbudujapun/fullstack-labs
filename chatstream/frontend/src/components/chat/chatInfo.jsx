import { useState } from "react";
import { Info, Users } from "lucide-react";
import useUserStore from "../../store/useUserStore";

const ChatInfo = ({ selectedChat }) => {
  const [showInfo, setShowInfo] = useState(false);
  const user = useUserStore((state) => state.user);

  if (!selectedChat) {
    return (
      <div className="w-full md:w-80 border-l border-gray-200 bg-gray-50 hidden md:block">
        <div className="p-6 text-center">
          <Info className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Select a chat to view details</p>
        </div>
      </div>
    );
  }

  const chatName = selectedChat.isGroup
    ? selectedChat.name
    : selectedChat.participants.find((p) => p._id !== user._id)?.username ||
      "Unknown";

  return (
    <>
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="md:hidden fixed bottom-20 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg z-10">
        <Info className="w-6 h-6" />
      </button>
      <div
        className={`w-full md:w-80 border-l border-gray-200 bg-gray-50 ${
          showInfo ? "fixed inset-0 z-20 md:relative" : "hidden md:block"
        }`}>
        {showInfo && (
          <button
            onClick={() => setShowInfo(false)}
            className="md:hidden absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full">
            ×
          </button>
        )}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
              {selectedChat.isGroup ? (
                <Users className="w-10 h-10" />
              ) : (
                chatName.slice(0, 2).toUpperCase()
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{chatName}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {selectedChat.isGroup
                ? `${selectedChat.participants?.length || 0} members`
                : selectedChat.participants.find((p) => p._id !== user._id)
                    ?.isOnline
                ? "Online"
                : "Last seen recently"}
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">About</h4>
              <p className="text-sm text-gray-600">
                {selectedChat.isGroup
                  ? "Group chat for team collaboration."
                  : "Available for chat."}
              </p>
            </div>
            {selectedChat.participants && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">
                  {selectedChat.isGroup ? "Members" : "Participants"}
                </h4>
                <div className="space-y-3">
                  {selectedChat.participants.map((participant) => (
                    <div
                      key={participant._id}
                      className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {participant.username.slice(0, 2).toUpperCase()}
                        </div>
                        {participant.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {participant.username}
                          {participant._id === user._id && " (You)"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {participant.isOnline ? "Online" : "Offline"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInfo;
