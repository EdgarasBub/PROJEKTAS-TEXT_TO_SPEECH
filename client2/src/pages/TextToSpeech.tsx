import React, { useState, useEffect } from 'react';
import { speakText } from '../utils/tts';
import '../styles/textToSpeech.css'; // Įsitikink, kad turi CSS
import '../styles/Utils.css'; // Importuojame bendrą stilių failą

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');

  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }

    loadVoices();
  }, []);

  const handleSpeak = () => {
    if (!text.trim()) {
      alert('Prašome įvesti tekstą!');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
  };

  return (
    <main className='text-to-speech-container'>
    <div className="tts-container">
      <h1 className="tts-title">🗣️ Teksto skaitymo programa</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Įveskite tekstą..."
        className="tts-textarea"
      />

      <div className="tts-select-container">
        <label htmlFor="voice-select">Pasirinkite balsą:</label>
        <select
          id="voice-select"
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
          className="tts-select"
        >
          {voices.map((voice, index) => (
            <option key={index} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleSpeak} className="utils-button">
        🔊 Skaityti tekstą
      </button>
    </div>
    </main>
  );
};

export default TextToSpeech;
