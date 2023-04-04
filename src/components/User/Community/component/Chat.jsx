import React, { useEffect, useState } from "react";
import ChatBubble from "./chatBubble";
import { FaPaperPlane } from "react-icons/fa";

const Chat = ({ socket, userName, roomId }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async (event) => {
    event.preventDefault();
    if (currentMessage) {
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const messageData = {
        room: roomId,
        user: userName,
        message: currentMessage,
        time: timestamp,
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    console.log(messageList, "list");
  });
  return (
    <div className="">
      <div className="flex-grow px-6 py-4 overflow-x-scroll chatHeight">
        {messageList.map((message, index) => (
          <ChatBubble
            key={index}
            socket={socket}
            time={message.time}
            userName={message.user}
            message={message.message}
            isUser={message.user === userName}
          />
        ))}
      </div>
      <div
        className="bg-white shadow-md px-6 py-3 w-full static"
        style={{ position: "", bottom: 0 }}
      >
        <div className="flex items-center justify-between rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Type your message here..."
            className="flex-grow px-3 py-2 text-sm bg-gray-100 text-gray-800 focus:outline-none"
            value={currentMessage}
            onChange={(event) => setCurrentMessage(event.target.value)}
          />
          <button
            onClick={sendMessage}
            className="text-purple-600 hover:text-purple-800 focus:outline-none"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
