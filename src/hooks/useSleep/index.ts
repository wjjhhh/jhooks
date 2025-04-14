import { useRef, useEffect } from 'react';

export type Fn = () => void;
export type SleepProgressCallback = (progress: number) => void;

const useSleep = (fn?: Fn) => {
  const controller = useRef<AbortController | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const isSleepingRef = useRef(false);

  const destory = () => {
    if (rafIdRef.current !== null && isSleepingRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      isSleepingRef.current = false
    };
    
    if (controller.current) {
      controller.current.abort();
      controller.current = null;
      fn?.();
    }
  }
    const makeCancelable = (promise: Promise<any>) => {
      controller.current = new AbortController();
      const { signal } = controller.current;
      return new Promise((resolve, reject) => {
        signal.addEventListener('abort', () => reject({ isCanceled: true }));
        promise.then(
          (val) => {
            if (signal.aborted) {
              reject({ isCanceled: true });
            } else {
              resolve(val);
            }
          },
          (error) => {
            if (signal.aborted) {
              reject({ isCanceled: true });
            } else {
              reject(error);
            }
          },
        );
      });
    };

    // const sleep = (time: number) => {
    //   controller.current = new AbortController();
    //   return new Promise((resolve) => {
    //     const timeoutId = setTimeout(() => {
    //       resolve(undefined);
    //     }, time);
    //     controller.current?.signal.addEventListener('abort', () => {
    //       clearTimeout(timeoutId);
    //     });
    //   });
    // };
    const sleep = (time: number, onProgress?: SleepProgressCallback) => {
      controller.current = new AbortController();
      controller.current.signal.addEventListener('abort', () => {

      })
      return new Promise((resolve) => {
        let startTime = performance.now();
        const step = (timestamp: number) => {
          if (!isSleepingRef.current) {
            return;
          }
          const elapsedTime = timestamp - startTime;
          const progress = elapsedTime / time;
          onProgress?.(Math.min(progress, 1));
          if (elapsedTime >= time) {
            resolve(undefined);
            isSleepingRef.current = false;
          } else {
            rafIdRef.current = requestAnimationFrame(step);
          }
        };
        isSleepingRef.current = true;
        rafIdRef.current = requestAnimationFrame(step);
      });
    };
    useEffect(() => {
      return () => {
        destory();
      };
    }, []);
    return {
      sleep,
      destory,
      makeCancelable,
    } as const;
  };

  export default useSleep;
