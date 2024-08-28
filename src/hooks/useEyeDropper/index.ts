import { useState, useCallback } from 'react';

interface EyeDropperResult {
  sRGBHex: string;
}

interface UseEyeDropperReturn {
  color: string | null;
  openEyeDropper: () => void;
  isSupported: boolean;
  reset: () => void;
  isLoading: boolean;
}

const useEyeDropper = (): UseEyeDropperReturn => {
  const [color, setColor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isSupported = 'EyeDropper' in window;

  const openEyeDropper = useCallback(() => {
    if (!isSupported) {
      console.error('EyeDropper API is not supported in your browser.');
      return;
    }

    const eyeDropper = new (window as any).EyeDropper();
    eyeDropper
      .open()
      .then((result: EyeDropperResult) => {
        setColor(result.sRGBHex);
      })
      .catch((error: Error) => {
        console.error('EyeDropper failed:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const reset = useCallback(() => {
    setColor(null);
  }, []);

  return {
    color,
    openEyeDropper,
    isSupported,
    reset,
    isLoading,
  };
};

export default useEyeDropper;
