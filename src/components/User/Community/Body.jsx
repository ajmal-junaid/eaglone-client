import React, { useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";

import io from "socket.io-client";
import { useSelector } from "react-redux";
import Chat from "./component/Chat";

function Body() {
  const userData = useSelector((state) => state.userData.value);
  console.log(userData, "hihjihih");
  const socket = io.connect("http://localhost:3000");
  const roomId = "12348";

  useEffect(() => {
    socket.emit("join_room", roomId);
  }, []);
  return (
    <div>
      {" "}
      <div className="flex flex-col bg-gray-50">
        <header className="flex items-center justify-between bg-white shadow-md px-4 py-3">
          <h1 className="text-lg font-bold text-gray-800">
            Design Community Chat
          </h1>
          <button className="text-purple-600 hover:text-purple-800 focus:outline-none">
            <FaEllipsisV />
          </button>
        </header>
        <Chat socket={socket} userName={userData.name} roomId={roomId} />
      </div>
    </div>
  );
}

export default Body;
