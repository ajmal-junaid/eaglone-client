import React from "react";
function ChatBubble({ userName, isUser, message, time }) {
  const bubbleClasses = `inline-block rounded-lg px-4 py-2 max-w-md ${
    isUser
      ? "bg-blue-500 text-white rounded-br-none ml-auto"
      : "bg-gray-100 text-gray-800 rounded-bl-none"
  }`;

  return (
    <div className={`flex ${isUser ? "flex-row-reverse" : ""} mb-4`}>
      <div className={bubbleClasses}>
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs font-medium">{userName}</p>
          <p className="text-xs text-gray-400 ml-2">{time}</p>
        </div>
        <p className="text-sm leading-6">{message}</p>
      </div>
    </div>
  );
}

export default ChatBubble;
