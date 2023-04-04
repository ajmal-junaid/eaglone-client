import React, { useEffect, useState } from "react";
import { FaPaperPlane, FaEllipsisV } from "react-icons/fa";
import ChatBubble from "./chatBubble";
import io from "socket.io-client";
import { useSelector } from "react-redux";

function Body() {
  const [newMessage, setNewMessage] = useState("");
  const userData = useSelector(state=>state.userData.value)
  console.log(userData,"hihjihih");
  const socket = io.connect("http://localhost:3000");
  const roomId = "12346";
  const [messages, setMessages] = useState([
    {
      user: "John Doe",
      message: "Hey everyone, check out this awesome design I made!",
      timestamp: "3:00 PM",
    },
    {
      user: "Jane Smith",
      message:
        "That looks really cool, John! Can you tell us more about your process?",
      timestamp: "3:01 PM",
    },
    {
      user: "Bob Johnson",
      message: "I love the colors you used, John. Great work!",
      timestamp: "3:03 PM",
    },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newMessage) {
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const newChat = { user: "You", message: newMessage, timestamp };
      setMessages([...messages, newChat]);
      setNewMessage("");
    }
  };
  useEffect(() => {
    socket.emit("join_room", roomId);
  }, []);
  return (
    <div>
      {" "}
      <div className="flex flex-col bg-gray-50 h-screen">
        <div className="flex items-center justify-between bg-white shadow-md px-4 py-3">
          <h1 className="text-lg font-bold text-gray-800">
            Design Community Chat
          </h1>
          <button className="text-purple-600 hover:text-purple-800 focus:outline-none">
            <FaEllipsisV />
          </button>
        </div>
        <div className="flex-grow px-6 py-4 overflow-y-auto">
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              socket={socket}
              userName={userData.name}
              message={message}
              isUser={message.user === "You"}
            />
          ))}
        </div>
        <form onSubmit={handleSubmit} className="bg-white shadow-md px-6 py-3">
          <div className="flex items-center justify-between rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Type your message here..."
              className="flex-grow px-3 py-2 text-sm bg-gray-100 text-gray-800 focus:outline-none"
              value={newMessage}
              onChange={(event) => setNewMessage(event.target.value)}
            />
            <button
              type="submit"
              className="text-purple-600 hover:text-purple-800 focus:outline-none"
            >
              <FaPaperPlane />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Body;
