import { useRef } from 'react';

export type Fn = () => void;

const useSleep = (fn?: Fn) => {
  const timeoutId = useRef<NodeJS.Timeout>()
  const promiseCanceld = useRef(false)
  const destory = () => {
    promiseCanceld.current = true
    clearTimeout(timeoutId.current);
    fn?.()
  };
  const makeCancelable = (promise: Promise<any>) => {
    promiseCanceld.current = false
    return new Promise((resolve, reject) => {
      promise.then(
        val => {
          promiseCanceld.current ? reject({ isCanceled: true }) : resolve(val)
        },
        error => {
          promiseCanceld.current ? reject({ isCanceled: true }) : reject(error)
        }
      );
    })
  }
  
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
    makeCancelable
  } as const;
};

export default useSleep;
