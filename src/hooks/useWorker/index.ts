import { useRef, useEffect, useState } from 'react';

type Options = WorkerOptions & {
  onMessage?: (message: MessageEvent) => void;
  onMessageError?: (evt: MessageEvent) => void;
  onError?: (evt: ErrorEvent) => void
};

type Status = 'idle' | 'open' | 'closed' | 'error';

function createWoker(f: Function, options?: WorkerOptions) {
  let code = f.toString();
  code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));
  const blob = new Blob([code], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);

  return new Worker(url, options);
}

const useWoker = (fn: Function, options: Options = {}) => {
  const { onMessage, onMessageError, onError, ...workerOptions } = options;
  const workerRef = useRef<Worker>();
  const [status, setStatus] = useState<Status>('idle');

  const post = (message: any, transfer: Transferable[]) => {
    workerRef.current?.postMessage(message, transfer);
  };
  const terminate = () => {
    setStatus('closed');
    workerRef.current?.terminate();
  };
  const start = () => {
    if (status !== 'open') {
      workerRef.current = createWoker(fn, workerOptions);
      if (workerRef.current) {
        if (typeof onMessage === 'function') {
          workerRef.current.onmessage = onMessage;
        }
        workerRef.current.onmessageerror = (e: MessageEvent) => {
          onMessageError?.(e);
          setStatus('error');
        };
        workerRef.current.onerror = (e: ErrorEvent) => { 
          onError?.(e) 
          setStatus('error');
          terminate()
        }
      }
      setStatus('open');
    }
  };
  if (!workerRef.current) {
    start();
  }
  useEffect(() => {
    return terminate;
  }, []);

  return [workerRef.current, { post, terminate, start, status }];
};

export default useWoker;
