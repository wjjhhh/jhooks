import { useRef, useState, useEffect } from 'react';

type Options = {
  stopByLeave?: boolean; // 离屏是否停止倒数
};

function useNow(millisecond?: number, options?: Options) {
  const [now, setNow] = useState(new Date());
  const oldTime = useRef(Date.now());
  let frequency = millisecond || 1000;

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
    rafId.current = window.requestAnimationFrame(updateNow);
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
    now: now.toString(),
    pause,
    resume,
  };
}

export default useNow;
