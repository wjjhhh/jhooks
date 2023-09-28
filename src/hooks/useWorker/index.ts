import { useRef, useEffect } from 'react';

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
  const workerRef = useRef<Worker>();
  if (!workerRef.current) {
    workerRef.current = createWoker(fnString, workerOptions);
  }

  const post = (message: any, transfer: Transferable[]) => {
    workerRef.current?.postMessage(message, transfer);
  };
  const terminate = () => {
    workerRef.current?.terminate();
  };
  useEffect(() => {
    if (typeof onMessage === 'function' && workerRef.current) {
      workerRef.current.onmessage = onMessage;
    }

    return terminate;
  }, []);

  return [workerRef.current, post, terminate];
};

export default useWoker;
