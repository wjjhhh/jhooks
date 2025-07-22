import { useState, useRef, useEffect } from 'react';

interface UseAudioOptions {
  // 音频源
  src: string;
  // 初始是否自动播放
  autoPlay?: boolean;
  // 初始音量
  initialVolume?: number;
  // 是否循环播放
  loop?: boolean;
  // 是否静音
  muted?: boolean;
}

const useAudio = ({ src, autoPlay = false, initialVolume = 0.5, muted, loop }: UseAudioOptions) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(initialVolume);

  useEffect(() => {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.loop = loop || false;
    audio.muted = muted || false;
    audioRef.current = audio;
    if (autoPlay) {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
      setIsPlaying(true);
    }
    return () => {
      audioRef.current?.pause();
    };
  }, [src, autoPlay, volume, muted, loop]);

  const play = () => {
    audioRef.current?.play().then(() => {
      setIsPlaying(true);
    }).catch((error) => {
      console.error('Error playing audio:', error);
    });
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const setNewVolume = (newVolume: number) => {
    const clampedVolume = Math.min(1, Math.max(0, newVolume));
    setVolume(clampedVolume);
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  };

  return {
    isPlaying,
    volume,
    play,
    pause,
    togglePlay,
    setNewVolume
  };
};

export default useAudio;