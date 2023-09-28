import { useMemo, useEffect } from 'react';

type Options = WorkerOptions & {
  onMessage?: (message: MessageEvent) => void;
};

function createWoker(f: string, options?: WorkerOptions) {
  let code = f.toString();
  code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));
  const blob = new Blob([code], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);

  return new Worker(url, options);
}

const useWoker = (fnString: string, options: Options = {}) => {
  const { onMessage, ...workerOptions } = options;
  let worker = createWoker(fnString, workerOptions);
  useEffect(() => {
    if (typeof onMessage === 'function') {
      worker.onmessage = onMessage;
    }

    return () => {
      worker.terminate();
    };
  }, []);
  const post = (message: any, transfer: Transferable[]) => {
    worker.postMessage(message, transfer)
  }
  return [worker, post];
};

export default useWoker;
