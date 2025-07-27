import ChatList from "../../components/chat/chatList";
import ChatBox from "../../components/chat/chatBox";
import ChatInfo from "../../components/chat/chatInfo";

const Chat = () => {
  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4 pb-8">
      {" "}
      <div className="container mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-2xl font-bold text-gray-800">ChatStream</h2>
          <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
            BH
          </div>
        </div>

        <div className="flex flex-col md:flex-row h-[75vh]">
          {/* Chat List */}
          <ChatList />

          {/* Chat Box */}
          <ChatBox />

          {/* Chat Info */}
          <ChatInfo />
        </div>
      </div>
    </div>
  );
};

export default Chat;
