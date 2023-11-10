import { useState, useEffect, useRef } from 'react';

let events = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel'];

function useIdle(time: number) {
  const [idle, setIdle] = useState(false);
  const timer = useRef<NodeJS.Timeout>();
  const onEvent = () => {
    reset()
  };
  const reset = () => {
    setIdle(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setIdle(true), time);
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
  return [{ isIdle: idle }, reset];
}

export default useIdle;
