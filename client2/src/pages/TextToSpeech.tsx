import React, { useState, useEffect } from 'react';
import { speakText } from '../utils/tts';
import '../styles/textToSpeech.css';
import '../styles/Utils.css';

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(1); // * Pridėta
  const [progress, setProgress] = useState(0); // * Pridėta


useEffect(() => {
  const synth = window.speechSynthesis;

  const loadVoices = () => {
    const allVoices = synth.getVoices();

    const filteredVoices = allVoices.filter(
      (v) => v.name.includes('Google UK')
    );

    setVoices(filteredVoices);

    
    if (filteredVoices.length > 0) {
      setSelectedVoice(filteredVoices[0].name);
    }
  };

  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = loadVoices;
  }

  loadVoices();
}, []);


const handleSpeak = () => {
  const synth = window.speechSynthesis;

  if (isSpeaking) {
    synth.cancel(); // Sustabdo skaitymą
    setIsSpeaking(false);
    setProgress(0); // * Nulina progresą
    return;
  }

  if (!text.trim()) {
    alert('Prašome įvesti tekstą!');
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  const voice = voices.find(v => v.name === selectedVoice);
  if (voice) utterance.voice = voice;

  utterance.volume = volume; // * Garsumas
  utterance.rate = rate;     // * Kalbėjimo greitis
  utterance.pitch = pitch;   // * Tonas

  const totalLength = text.length;
  let currentLength = 0;

  utterance.onboundary = (event) => {
    if (event.charIndex !== undefined) {
      currentLength = event.charIndex;
      const percent = Math.min((currentLength / totalLength) * 100, 100);
      setProgress(percent); // * Atnaujina progresą
    }
  };

  utterance.onend = () => {
    setIsSpeaking(false);
    setProgress(100); // * Užbaigia progresą
  };

  synth.speak(utterance);
  setIsSpeaking(true); // * Nustato kalbėjimo būseną
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

        {/* * Pridėta: greitis ir tonas */}
        <div className="tts-slider-group">
          <label htmlFor="rate">🔁 Greitis: {rate.toFixed(1)}</label>
          <input
            id="rate"
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="tts-slider"
          />
          <label htmlFor="volume">🔊 Garsumas: {Math.round(volume * 100)}%</label>
          <input
            type="range"
            id="volume"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="tts-slider"
          />
          <label htmlFor="pitch">🎵 Tonas: {pitch.toFixed(1)}</label>
          <input
            id="pitch"
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(Number(e.target.value))}
            className="tts-slider"
          />
        </div>
            {isSpeaking && (
            <div className="reading-indicator">🔊 Skaitoma...</div>
          )}
          {isSpeaking && (
  <div className="progress-bar-container">
    <div
      className="progress-bar"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
)}

        <button
          onClick={handleSpeak}
          className={`utils-button-dinamic ${isSpeaking ? 'reading' : ''}`} // *
        >
          {isSpeaking ? '⏹️ Sustabdyti' : '🔊 Skaityti tekstą'}
        </button>
      </div>
    </main>
  );
};

export default TextToSpeech;
