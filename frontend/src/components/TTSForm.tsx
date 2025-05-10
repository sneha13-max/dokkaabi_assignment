import React, { useState } from "react";
import axios from "axios";

const TTSForm: React.FC = () => {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const handleTTS = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/tts", {
        text,
      });

      setAudioUrl(response.data.audio_url);
    } catch (error) {
      console.error("Error generating TTS:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="font-bold mb-2">Text-to-Speech</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to convert to speech"
        className="border p-2 mb-2 w-full"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleTTS}
      >
        Convert to Audio
      </button>

      {audioUrl && (
        <div className="mt-4">
          <audio controls src={audioUrl} />
        </div>
      )}
    </div>
  );
};

export default TTSForm;
