import { useRef } from 'react';

export type Fn = () => void;

const useSleep = (fn?: Fn) => {
  const timeoutId = useRef<NodeJS.Timeout>()
  const destory = () => {
    clearTimeout(timeoutId.current);
    fn?.()
  };
  const sleep = (time: number) => {
    return new Promise((resolve) => {
      timeoutId.current = setTimeout((args: unknown) => {
        resolve(args);
      }, time);
  
    });
  };
 
  return {
    sleep,
    destory,
  } as const;
};

export default useSleep;
