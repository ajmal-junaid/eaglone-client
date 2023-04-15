import React, { useEffect, useState } from "react";

import io from "socket.io-client";
import { useSelector } from "react-redux";
import Chat from "./component/Chat";
import instance from "../../../utils/axios";
import { BeatLoader } from "react-spinners";

function Body() {
  const userData = useSelector((state) => state.userData.value);
  const [categories, setCategories] = useState([]);
  const [roomId, setRoomId] = useState("Common");
  const socket = io.connect("wss://www.eaglone.online");
  const [onlineCount, setOnlineCount] = useState(io.sockets.adapter.rooms.get(roomId)?.size ||0);
  useEffect(() => {
    instance
      .get("categories")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((res) => {
        console.log(res.response, "catch");
      });
    socket.emit("join_room", roomId);
  }, []);
  const changeRoom = (newRoom) => {
    setRoomId(newRoom);
    socket.emit("join_room", newRoom);
    setOnlineCount(io.sockets.adapter.rooms.get(newRoom)?.size || 0);
  };

  return (
    <div className="flex flex-col relative">
      <header className="bg-gray-100 py-5">
        <nav className="flex justify-between items-center text-center container mx-auto">
          <div className="w-full">
            <a
              href="/"
              className="text-3xl font-bold text-black font-serif text-center"
            >
              Eaglone Community
            </a>
          </div>
          <div className="sticky inline-block ml-auto">
            <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-full">
              <span className="text-sm font-medium">Online</span>
              <span className="ml-1 py-1 px-2 bg-green-500 text-white rounded-full">
               {onlineCount}
              </span>
            </button>
          </div>
        </nav>
      </header>

      <div className="flex relative">
        <div className="w-2/6 bg-gray-200 p-4 border-r border-gray-400">
          <div className="bg-gray-700 text-white rounded-t-md px-4 py-2">
            <h2 className="text-lg font-bold">Communities</h2>
          </div>
          <div
            className=" rounded-b-md px-4 py-2 overflow-y-auto"
            style={{ maxHeight: "500px" }}
          >
            {categories.length ? categories.map((category, index) => (
              <div
                key={index}
                onClick={() => changeRoom(category.name)}
                className={`flex cursor-pointer items-center py-3 hover:border-blue-600 ${
                  category.name === roomId ? "bg-slate-300 border" : ""
                } `}
              >
                <div className="h-12 w-12 rounded  flex items-center justify-center text-white font-bold text-2xl">
                  <img src={category.image}></img>
                </div>
                <div className="ml-4">
                  <div className="text-gray-800 font-bold">{category.name}</div>
                </div>
              </div>
            )):  <div className="flex justify-center items-center h-32">
            <BeatLoader size={20} color="#3B82F6" />
          </div>}
          </div>
        </div>
        <div className="px-4 w-full bg-white p-4">
          <Chat
            socket={socket}
            userId={userData._id}
            userName={userData.name}
            roomId={roomId}
          />
        </div>
      </div>
    </div>
  );
}

export default Body;
