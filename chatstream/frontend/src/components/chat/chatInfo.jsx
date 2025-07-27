const chatInfo = () => {
  return (
    <>
      <div className="hidden md:block md:w-1/4 p-5 bg-white border-l">
        <h3 className="text-lg font-semibold mb-4">MERN Stack Group</h3>
        <img
          src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
          className="rounded-xl mb-4"
          alt=""
        />
        <div className="text-sm text-gray-600 mb-2">
          <strong>Created:</strong> 22 Sep 2021
        </div>
        <p className="text-gray-600 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt,
          perspiciatis!
        </p>
      </div>
    </>
  );
};

export default chatInfo;
