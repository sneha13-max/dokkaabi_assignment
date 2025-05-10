import React, { useState } from "react";
import axios from "axios";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState("");
  const [ttsInput, setTtsInput] = useState("");
  const [loadingTTS, setLoadingTTS] = useState(false);
  const [loadingSTT, setLoadingSTT] = useState(false);

  /**
   * Handle Sending Text Input
   */
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const botResponseText = `You said: "${input}"`;
    const botMessage: ChatMessage = { sender: "bot", text: botResponseText };
    setMessages((prev) => [...prev, botMessage]);

    handleTTS(botResponseText);
    setInput("");
  };

  /**
   * Handle TTS (Text-to-Speech) Conversion
   */
  const handleTTS = async (text: string) => {
    setLoadingTTS(true);
    setAudioUrl(null);

    try {
      const response = await axios.post("http://localhost:8000/api/tts", {
        text,
      });
      setAudioUrl(response.data.audio_url);
    } catch (error) {
      console.error("Error generating TTS:", error);
    } finally {
      setLoadingTTS(false);
    }
  };

  /**
   * Handle Custom TTS Input
   */
  const handleTTSInput = async () => {
    if (!ttsInput.trim()) return;
    handleTTS(ttsInput);
    setTtsInput("");
  };

  /**
   * Handle File Upload for STT
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAudioFile(e.target.files[0]);
    }
  };

  /**
   * Handle Speech-to-Text (STT) Conversion
   */
  const handleSTT = async () => {
    if (!audioFile) return;
    setLoadingSTT(true);
    setTranscript("");

    const formData = new FormData();
    formData.append("audio", audioFile);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/stt/123",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setTranscript(response.data.transcript);
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: response.data.transcript },
      ]);
    } catch (error) {
      console.error("Error processing STT:", error);
    } finally {
      setLoadingSTT(false);
      setAudioFile(null);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Chat with AI Assistant
      </h1>

      {/* Chat Window */}
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-2xl mb-6 h-64 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-500">Start a conversation...</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 mb-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white text-right ml-auto"
                  : "bg-green-500 text-white mr-auto"
              }`}
              style={{ maxWidth: "70%" }}
            >
              {msg.text}
            </div>
          ))
        )}
      </div>

      {/* Text Input */}
      <div className="w-full max-w-2xl mb-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>

      {/* Audio Playback */}
      {audioUrl && (
        <div className="mb-4 w-full max-w-2xl">
          <audio controls src={audioUrl} className="w-full" />
        </div>
      )}

      {/* Custom TTS Input */}
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-2xl mb-4">
        <h2 className="font-bold mb-2">Text-to-Speech (TTS)</h2>
        <div className="flex">
          <input
            type="text"
            value={ttsInput}
            onChange={(e) => setTtsInput(e.target.value)}
            placeholder="Enter text for TTS"
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
          />
          <button
            onClick={handleTTSInput}
            className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600"
            disabled={loadingTTS}
          >
            {loadingTTS ? "Loading..." : "Convert"}
          </button>
        </div>
      </div>

      {/* STT Section */}
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="font-bold mb-2">Speech-to-Text (STT)</h2>
        <div className="flex items-center gap-2">
          <input type="file" accept="audio/*" onChange={handleFileChange} />
          <button
            onClick={handleSTT}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            disabled={!audioFile || loadingSTT}
          >
            {loadingSTT ? "Processing..." : "Convert"}
          </button>
        </div>

        {transcript && (
          <div className="mt-4 bg-gray-100 p-2 rounded-lg">
            <p>{transcript}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
