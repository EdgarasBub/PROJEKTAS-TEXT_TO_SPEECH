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
      synth.cancel(); 
      setIsSpeaking(false);
      return;
    }
    if (!text.trim()) {
      alert('Prašome įvesti tekstą!');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) utterance.voice = voice;

    utterance.rate = rate; // * Pridėta
    utterance.pitch = pitch; // * Pridėta

      utterance.onend = () => {
      setIsSpeaking(false); // * Kai baigia skaityti
    };

    synth.speak(utterance);
    setIsSpeaking(true); // * Nustatome kalbėjimą į true
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

        <button onClick={handleSpeak} className="utils-button">
          {isSpeaking ? '⏹️ Sustabdyti' : '🔊 Skaityti tekstą'}
        </button>
      </div>
    </main>
  );
};

export default TextToSpeech;
