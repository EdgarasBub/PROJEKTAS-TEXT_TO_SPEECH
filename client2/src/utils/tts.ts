export const speakText = (text: string): void => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'lt-LT';
  utterance.rate = 1;
  utterance.pitch = 1;
  speechSynthesis.speak(utterance);
};
