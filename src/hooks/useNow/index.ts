import { useRef, useState, useEffect } from 'react';

type Wrapper = (date: Date) => string;

function useNow(millisecond?: number, wrapper?: Wrapper) {
  const [now, setNow] = useState(new Date());
  const oldTime = useRef(Date.now());
  let frequency = millisecond ?? 1000;

  const rafId = useRef<number>();
  const updateNow = () => {
    const diff = Date.now() - oldTime.current;
    if (diff >= frequency) {
      oldTime.current = Date.now();
      setNow(new Date());
    }
    rafId.current = window.requestAnimationFrame(updateNow);
  };

  const pause = () => {
    rafId.current && window.cancelAnimationFrame(rafId.current);
  };
  const resume = () => {
    if (frequency > 0) {
      rafId.current = window.requestAnimationFrame(updateNow);
    }
  };
  if (!rafId.current) {
    resume();
  }
  const handleVisibleChange = () => {
    if (document.hidden) {
      pause();
    } else {
      resume();
    }
  };
  useEffect(() => {
    window.addEventListener('visibilitychange', handleVisibleChange);
    return () => {
      pause();
      window.removeEventListener('visibilitychange', handleVisibleChange);
    };
  }, []);
  return {
    now: typeof wrapper === 'function' ? wrapper(now) : now.toString(),
    pause,
    resume,
  };
}

export default useNow;
