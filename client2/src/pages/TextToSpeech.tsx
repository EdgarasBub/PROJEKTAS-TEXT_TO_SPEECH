import React, { useState } from 'react';
import { speakText } from '../utils/tts';
// Jei nori CSS vietoj Tailwind:
// import '../styles/textToSpeech.css';

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
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">🗣️ Teksto skaitymo programa</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Įveskite tekstą..."
        className="w-full h-32 p-4 border border-gray-300 rounded-xl resize-none text-lg"
      />
      <button
        onClick={handleSpeak}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        🔊 Skaityti tekstą
      </button>
    </div>
  );
};

export default TextToSpeech;
