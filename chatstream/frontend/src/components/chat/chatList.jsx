const chatList = () => {
  return (
    <>
      <div className="md:w-1/4 border-r overflow-y-auto">
        {/* Chat Search */}
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search chats"
            className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Chat Users */}
        {[
          {
            name: "Luis1994",
            message: "Pick me at 9:00 AM",
            img: "https://placehold.co/48",
          },
          {
            name: "Everest Trip 2021",
            message: "Hi Sam, Welcome",
            img: "https://placehold.co/48",
          },
          {
            name: "MERN Stack",
            message: "Lusi: Thanks Everyone",
            img: "https://placehold.co/48",
            active: true,
          },
        ].map((chat, i) => (
          <div
            key={i}
            className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-100 ${
              chat.active ? "bg-blue-50 border-l-4 border-blue-400" : ""
            }`}>
            <img
              src={chat.img}
              className="h-12 w-12 rounded-full object-cover mr-3"
              alt=""
            />
            <div>
              <div className="font-semibold text-sm">{chat.name}</div>
              <div className="text-sm text-gray-500">{chat.message}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default chatList;
