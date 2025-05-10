import React from "react";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

interface ChatWindowProps {
  messages: ChatMessage[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.length === 0 ? (
        <p className="text-gray-400">Start a conversation...</p>
      ) : (
        messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))
      )}
    </div>
  );
};

export default ChatWindow;
