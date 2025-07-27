const chatBox = () => {
  return (
    <>
      <div className="md:w-2/4 w-full flex flex-col justify-between p-4 bg-gray-50">
        <div className="overflow-y-auto space-y-4 pr-2">
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white px-4 py-3 rounded-3xl rounded-br-sm shadow-sm max-w-[75%]">
              Welcome to group everyone!
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-gray-300 text-white px-4 py-3 rounded-3xl rounded-bl-sm shadow-sm max-w-[75%]">
              Lorem ipsum dolor sit amet consectetur...
            </div>
          </div>
          <div className="flex justify-end flex-col items-end space-y-2">
            <div className="bg-blue-500 text-white px-4 py-3 rounded-3xl rounded-br-sm shadow-sm max-w-[75%]">
              Lorem ipsum dolor...
            </div>
            <div className="bg-blue-500 text-white px-4 py-3 rounded-3xl rounded-br-sm shadow-sm max-w-[75%]">
              Debitis, reiciendis!
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-gray-300 text-white px-4 py-3 rounded-3xl rounded-bl-sm shadow-sm max-w-[75%]">
              Happy holiday guys!
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-gray-300 text-white px-4 py-3 rounded-3xl rounded-bl-sm shadow-sm max-w-[75%]">
              Lorem ipsum dolor sit amet consectetur...
            </div>
          </div>
          <div className="flex justify-end flex-col items-end space-y-2">
            <div className="bg-blue-500 text-white px-4 py-3 rounded-3xl rounded-br-sm shadow-sm max-w-[75%]">
              Lorem ipsum dolor...
            </div>
            <div className="bg-blue-500 text-white px-4 py-3 rounded-3xl rounded-br-sm shadow-sm max-w-[75%]">
              Debitis, reiciendis!
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-gray-300 text-white px-4 py-3 rounded-3xl rounded-bl-sm shadow-sm max-w-[75%]">
              Happy holiday guys!
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-gray-300 text-white px-4 py-3 rounded-3xl rounded-bl-sm shadow-sm max-w-[75%]">
              Lorem ipsum dolor sit amet consectetur...
            </div>
          </div>
          <div className="flex justify-end flex-col items-end space-y-2">
            <div className="bg-blue-500 text-white px-4 py-3 rounded-3xl rounded-br-sm shadow-sm max-w-[75%]">
              Lorem ipsum dolor...
            </div>
            <div className="bg-blue-500 text-white px-4 py-3 rounded-3xl rounded-br-sm shadow-sm max-w-[75%]">
              Debitis, reiciendis!
            </div>
          </div>
        </div>
        <div className="pt-4">
          <input
            type="text"
            placeholder="Type your message here..."
            className="w-full px-4 py-3 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </>
  );
};

export default chatBox;
