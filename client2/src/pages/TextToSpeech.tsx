import React, { useState, useEffect,useRef } from 'react';
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
  const progressIntervalRef = useRef<number | null>(null);
  const [showSettings, setShowSettings] = useState(false); // * ar rodyti meniu
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // *





useEffect(() => {
  const synth = window.speechSynthesis;

  const loadVoices = () => {
    let allVoices = synth.getVoices();

    if (allVoices.length === 0) {
      // Jei balsai dar neužkrauti, palaukiam šiek tiek ir bandome vėl
      setTimeout(loadVoices, 100);
      return;
    }

    const filteredVoices = allVoices.filter(
      (v) => v.lang === 'en-GB' && v.name.toLowerCase().includes('google')
    );

    setVoices(filteredVoices);

    if (filteredVoices.length > 0) {
      setSelectedVoice(filteredVoices[0].name);
    }
  };

  // Kviečiam pradinį balsų užkrovimą
  loadVoices();

  // Jei naršyklė palaiko onvoiceschanged, nustatome
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = loadVoices;
  }
}, []);


const estimateDuration = (text: string, rate: number = 1): number => {
  const wordsPerMinute = 180; // Apytikslis WPM
  const words = text.trim().split(/\s+/).length;
  const minutes = words / (wordsPerMinute * rate);
  return minutes * 60 * 1000; // konvertuoti į ms
};


const handleSpeak = () => {
  const synth = window.speechSynthesis;

  if (isSpeaking) {
    synth.cancel();
    setIsSpeaking(false);
    setProgress(0);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    return;
  }

  if (!text.trim()) {
    alert('Prašome įvesti tekstą!');
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  const voice = voices.find(v => v.name === selectedVoice);
  if (voice) utterance.voice = voice;

  utterance.volume = volume;
  utterance.rate = rate;
  utterance.pitch = pitch;

  const estimatedDuration = estimateDuration(text, rate); // ⬅️ nauja funkcija
  const startTime = Date.now();

  progressIntervalRef.current = window.setInterval(() => {
    const elapsed = Date.now() - startTime;
    const percent = Math.min((elapsed / estimatedDuration) * 100, 100);
    setProgress(percent);
    if (percent >= 100) {
      clearInterval(progressIntervalRef.current!);
    }
  }, 100); // kas 100ms

  utterance.onend = () => {
    setIsSpeaking(false);
    setProgress(100);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  synth.speak(utterance);
  setIsSpeaking(true);
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

    <div className="tts-settings-toggle">
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


{!isSettingsOpen ? (
  <button
    onClick={() => setIsSettingsOpen(true)}
    className="utils-button settings-toggle"
  >
    ⚙️ Nustatymai
  </button>
) : (
  <button
    onClick={() => setIsSettingsOpen(false)}
    className="utils-button settings-toggle close"
  >
    ❌ Užverti
  </button>
)}

</div>

{isSettingsOpen && (
  <div className={`tts-settings-menu ${isSettingsOpen ? 'open' : 'closed'}`}>
    <div className="tts-setting-row">
      <label htmlFor="volume">🔊 Garsumas</label>
      <input
        id="volume"
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
      />
      <span>{volume}</span>
    </div>

    <div className="tts-setting-row">
      <label htmlFor="rate">⚡ Greitis</label>
      <input
        id="rate"
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={rate}
        onChange={(e) => setRate(parseFloat(e.target.value))}
      />
      <span>{rate}</span>
    </div>

    <div className="tts-setting-row">
      <label htmlFor="pitch">🎵 Tonas</label>
      <input
        id="pitch"
        type="range"
        min="0"
        max="2"
        step="0.1"
        value={pitch}
        onChange={(e) => setPitch(parseFloat(e.target.value))}
      />
      <span>{pitch}</span>
    </div>
  </div>
)}



  {isSpeaking && (<div className="reading-indicator">🔊 Skaitoma...</div>)}
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
