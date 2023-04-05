import React, { useEffect } from "react";

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
    <div className="flex flex-col max-h-screen">
      <header className="bg-gray-100 py-5">
        <nav className=" text-center container mx-auto">
          <a href="/" className="text-3xl font-bold text-black font-serif tex">
            Eaglone Community
          </a>
        </nav>
      </header>
      <div>
        <Chat socket={socket} userName={userData.name} roomId={roomId} />
      </div>
    </div>
  );
}

export default Body;
