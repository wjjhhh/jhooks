import { useState, useRef, useEffect } from 'react';

interface UseAudioOptions {
  // 音频源
  src?: string;
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
  const [volume, _setVolume] = useState(initialVolume);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!src) {
      return
    }
    setIsLoading(true);
    const audio = new Audio(src);
    audio.volume = volume;
    audio.loop = loop || false;
    audio.muted = muted || false;
    audioRef.current = audio;

    const handleCanPlayThrough = () => {
      setIsLoading(false);
      if (autoPlay) {
        audio.play().catch((error) => {
          console.error('Error playing audio:', error);
        });
        setIsPlaying(true);
      }
    }
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    return () => {
      audioRef.current?.pause();
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, [src, autoPlay, volume, muted, loop]);

  const play = () => {
    if (!audioRef.current || isLoading) return
    audioRef.current?.play().then(() => {
      console.log('Audio is playing !!!!');
      setIsPlaying(true);
    }).catch((error) => {
      console.error('Error playing audio:', error);
    });
  };

  const pause = () => {
    if (!audioRef.current) return
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

  const setVolume = (newVolume: number) => {
    const clampedVolume = Math.min(1, Math.max(0, newVolume));
    _setVolume(clampedVolume);
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
    setVolume,
    isLoading,
    audioRef,
  };
};

export default useAudio;