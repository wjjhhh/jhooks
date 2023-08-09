import { useState, useEffect, useRef } from 'react';

type Options = {
    lang?: string,
    pitch?: SpeechSynthesisUtterance['pitch'],
    rate?: SpeechSynthesisUtterance['rate'],
    voice?: SpeechSynthesisVoice,
    volume?: SpeechSynthesisUtterance['volume']
};

type Status = 'init' | 'ing' | 'pause' | 'end';

const useSpeechSynthesis = (text: string, options: Options = {}) => {
  const [status, setStatus] = useState<Status>('init');
  const [error, setError] = useState<SpeechSynthesisErrorEvent>();
  const ss = window?.speechSynthesis;
  const isSupported = !!ss;
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const bindUtterance = () => {
    if (utterance.current) {
      utterance.current.lang = options?.lang || 'en-US'
      utterance.current.voice = options?.voice || null;
      utterance.current.pitch = options?.pitch ?? 1
      utterance.current.rate = options?.rate ?? 1
      utterance.current.volume = options?.volume ?? 1

      utterance.current.onstart = () => {
        console.log('onstart');
        setStatus('ing');
      };
    //   utterance.current.onpause = () => {
    //     console.log('onpause');
    //     setStatus('pause');
    //   };
    //   utterance.current.onresume = () => {
    //     console.log('onresume');
    //     setStatus('ing');
    //   };
      utterance.current.onend = () => {
        console.log('onend');
        setStatus('end');
      };
      utterance.current.onerror = (e) => {
        console.log(e)
        setError(e);
      };
    }
  };
  if (utterance.current === null) {
    utterance.current = new SpeechSynthesisUtterance(text);
    bindUtterance();
  }

  useEffect(() => {
    utterance.current = new SpeechSynthesisUtterance(text);
    bindUtterance();
  }, [text, options]);

  const speak = () => {
    ss?.cancel();
    utterance.current && ss?.speak(utterance.current);
  };
  const stop = () => {
    ss?.cancel();
  };
  const pause = () => {
    if (status === 'ing') {
      ss?.pause();
      setStatus('pause');
    }
  };
  const resume = () => {
    if (status === 'pause') {
      ss?.resume();
      setStatus('ing');
    }
  };
  
  return {
    isSupported,
    stop,
    speak,
    utterance: utterance.current,
    status,
    error,
    pause,
    resume,
  };
};

export default useSpeechSynthesis;
