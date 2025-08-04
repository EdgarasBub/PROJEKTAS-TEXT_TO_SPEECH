import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, Form, ProgressBar } from 'react-bootstrap';
import '../styles/auth/shared.css';
import '../styles/tts/TextToSpeech.css';

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const progressIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const allVoices = synth.getVoices();
      if (allVoices.length === 0) {
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

    loadVoices();

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const estimateDuration = (text: string, rate: number = 1): number => {
    const wordsPerMinute = 180;
    const words = text.trim().split(/\s+/).length;
    const minutes = words / (wordsPerMinute * rate);
    return minutes * 60 * 1000;
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

    const estimatedDuration = estimateDuration(text, rate);
    const startTime = Date.now();

    progressIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percent = Math.min((elapsed / estimatedDuration) * 100, 100);
      setProgress(percent);
      if (percent >= 100) {
        clearInterval(progressIntervalRef.current!);
      }
    }, 100);

    utterance.onend = () => {
      setIsSpeaking(false);
      setProgress(100);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };

    synth.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <Container fluid="xxl" className="tts-container py-4">
      <div className="tts-card p-4 p-md-5">
        <h1 className="tts-title mb-4">
          <span className="emoji">🗣️</span> Speech4You Converter
        </h1>

        <Form.Control
          as="textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Įveskite tekstą konvertavimui į kalbą..."
          className="tts-textarea mb-4"
          rows={8}
        />

        <div className="tts-controls d-flex flex-wrap justify-content-between align-items-center mb-4">
          <Form.Group className="tts-voice-selector me-3">
            <Form.Label>Balsas:</Form.Label>
            <Form.Select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="tts-select"
            >
              {voices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="tts-settings-toggle"
            // variant="outline-primary"
          >
            {isSettingsOpen ? '❌ Uždaryti' : '⚙️ Nustatymai'}
          </Button>
        </div>

        {isSettingsOpen && (
          <div className="tts-settings-panel p-3 mb-4">
            <Form.Group className="mb-3">
              <Form.Label>🔊 Garsumas: {volume.toFixed(1)}</Form.Label>
              <Form.Range
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>⚡ Greitis: {rate.toFixed(1)}</Form.Label>
              <Form.Range
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>🎵 Tonas: {pitch.toFixed(1)}</Form.Label>
              <Form.Range
                min="0"
                max="2"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
              />
            </Form.Group>
          </div>
        )}

        {isSpeaking && (
          <div className="tts-status mb-3">
            <div className="tts-progress-labels d-flex justify-content-between">
              <span>🔊 Skaitoma...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <ProgressBar 
              now={progress} 
              className="tts-progress-bar mt-2" 
            />
          </div>
        )}

        <Button
          onClick={handleSpeak}
          className="tts-main-button"
          variant={isSpeaking ? "danger" : "primary"}
          size="lg"
        >
          {isSpeaking ? '⏹️ Sustabdyti' : '🔊 Pradėti skaitymą'}
        </Button>
      </div>
    </Container>
  );
};

export default TextToSpeech;