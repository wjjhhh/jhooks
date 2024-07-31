import { useRef, useEffect } from 'react';

export type Fn = () => void;

const useSleep = (fn?: Fn) => {
  const controller = useRef<AbortController | null>(null);

  const destory = () => {
    if (controller.current) {
      controller.current.abort();
      controller.current = null;
      fn?.();
    }
  };
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

  const sleep = (time: number) => {
    controller.current = new AbortController();
    return new Promise((resolve) => {
      const timeoutId = setTimeout(() => {
        resolve(undefined);
      }, time);
      controller.current?.signal.addEventListener('abort', () => {
        clearTimeout(timeoutId);
      });
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
