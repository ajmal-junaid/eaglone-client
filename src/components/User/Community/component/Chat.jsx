import React, { useEffect, useState } from "react";
import ChatBubble from "./chatBubble";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import ScrollToBottom from "react-scroll-to-bottom";
import instance from "../../../../utils/axios";

const Chat = ({ socket, userName, roomId, userId }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage) {
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const messageData = {
        room: roomId,
        user: userName,
        userId: userId,
        message: currentMessage,
        time: timestamp,
      };
      await socket.emit("send_message", messageData);
      setCurrentMessage("");
    }
  };
  useEffect(() => {
    getMessages(roomId);
    socket.on("recieve_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [roomId]);
  const getMessages = (room) => {
    instance
      .get(`community?room=${room}`)
      .then((res) => {
        setMessageList(res.data.data.messages);
      })
      .catch((res) => {
        console.log(res, "catch");
      });
  };
  return (
    <div className="relative">
      <div className="flex-grow px-6 py-4">
        <ScrollToBottom className="chatHeight">
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
        </ScrollToBottom>
      </div>
      <div className="bg-white shadow-md px-3 py-2 w-full static">
        <div className="flex items-center justify-between rounded-lg overflow-hidden">
          <motion.input
            type="text"
            placeholder="Type your message here..."
            className="w-full text-sm bg-gray-100 flex-grow text-gray-800 rounded-lg border border-gray-300 py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
            value={currentMessage}
            onChange={(event) => setCurrentMessage(event.target.value)}
            onKeyPress={(e) => {
              e.key === "Enter" && sendMessage();
            }}
            whileFocus={{ boxShadow: "0 0 0 2px #2563eb40" }}
          />
          <button
            onClick={() => sendMessage()}
            className="text-purple-600 hover:text-purple-800 focus:outline-none right-4 top-1/2 transform "
            disabled={!currentMessage}
          >
            <motion.div
              className="bg-blue-500 rounded-full p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaPaperPlane className="text-white" />
            </motion.div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
