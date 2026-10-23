import { useState, useEffect } from 'react';

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        const available = window.speechSynthesis.getVoices();
        // Filter for English voices
        const englishVoices = available.filter(v => v.lang.startsWith('en'));
        setVoices(englishVoices.length > 0 ? englishVoices : available);
        
        // Prefer natural sounding English voices like Google US English or Samantha or Daniel
        const preferred = englishVoices.find(v => 
          v.name.includes('Natural') || 
          v.name.includes('Google US English') || 
          v.name.includes('Daniel') ||
          v.name.includes('Samantha')
        ) || englishVoices[0] || available[0];
        
        setSelectedVoice(preferred || null);
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  const speak = (text, rate = 0.95, pitch = 1.0) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Stop any active speech

    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return {
    isSpeaking,
    voices,
    selectedVoice,
    setSelectedVoice,
    speak,
    stop
  };
}
