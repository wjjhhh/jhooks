import { useState, useEffect, useRef } from 'react';

let events = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel'];

function useIdle(timeout: number) {
  const [idle, setIdle] = useState(false);
  const [lastActive, setLastActive] = useState<number>()
  const timer = useRef<NodeJS.Timeout>();
  const onEvent = () => {
    reset()
  };
  const reset = () => {
    setIdle(false);
    setLastActive(Date.now())
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setIdle(true), timeout);
  };
  useEffect(() => {
    reset();
    for (let e in events) {
      document.addEventListener(events[e], onEvent, { passive: true });
    }
    return () => {
      for (let e in events) {
        document.removeEventListener(events[e], onEvent);
      }
    };
   
  }, []);
  return { isIdle: idle, lastActive, reset };
}

export default useIdle;
