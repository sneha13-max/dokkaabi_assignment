import React, { useState, useEffect } from "react";

const RealTimeSTT: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const startWebSocket = () => {
    const ws = new WebSocket("ws://localhost:8000/ws/stt/123");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const message = event.data;
      setMessages((prev) => [...prev, message]);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    setSocket(ws);
  };

  const stopWebSocket = () => {
    if (socket) {
      socket.close();
    }
  };

  useEffect(() => {
    return () => {
      stopWebSocket();
    };
  }, [socket]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="font-bold mb-2">Real-Time Speech-to-Text</h2>

      <button
        className="bg-green-500 text-white px-4 py-2 mr-2 rounded"
        onClick={startWebSocket}
      >
        Start Listening
      </button>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={stopWebSocket}
      >
        Stop Listening
      </button>

      <div className="mt-4 bg-gray-100 p-2 rounded">
        <h3 className="font-bold">Transcripts:</h3>
        {messages.length > 0 ? (
          messages.map((msg, index) => <p key={index}>{msg}</p>)
        ) : (
          <p>No messages yet.</p>
        )}
      </div>
    </div>
  );
};

export default RealTimeSTT;
