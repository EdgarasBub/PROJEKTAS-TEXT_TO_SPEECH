import React, { useState } from 'react';
import { speakText } from '../utils/tts';
import '../styles/textToSpeech.css'; // ✅ Nuoroda į CSS failą
import '../styles/Utils.css'

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState('');

  const handleSpeak = () => {
    if (!text.trim()) {
      alert('Prašome įvesti tekstą!');
      return;
    }
    speakText(text);
  };

  return (
    <main className="text-to-speech-container">
      <div className="tts-container">
        <h1 className="tts-title">🗣️ Teksto skaitymo programa</h1>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Įveskite tekstą..."
          className="tts-textarea"
        />
        <button
          onClick={handleSpeak}
          className="utils-button"
        >
          🔊 Skaityti tekstą
        </button>
      </div>
    </main>
  );
};

export default TextToSpeech;
