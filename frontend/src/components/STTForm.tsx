import React, { useState } from "react";
import axios from "axios";

const STTForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSTT = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("audio", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/stt/123",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTranscript(response.data.transcript);
    } catch (error) {
      console.error("Error processing STT:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="font-bold mb-2">Speech-to-Text</h2>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="mb-2"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSTT}
        disabled={!file}
      >
        Convert to Text
      </button>

      {transcript && (
        <div className="mt-4 bg-gray-100 p-2 rounded">
          <p>Transcript: {transcript}</p>
        </div>
      )}
    </div>
  );
};

export default STTForm;
