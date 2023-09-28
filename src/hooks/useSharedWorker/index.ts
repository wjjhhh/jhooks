import { useEffect, useRef } from 'react';

function createWoker(f: string, options?: WorkerOptions) {
  let code = f.toString();
  code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));
  const blob = new Blob([code], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);

  return new SharedWorker(url, options);
}

const useSharedWorker = (fnString: string) => {
  const workRef = useRef<SharedWorker>();
  if (!workRef.current) {
    workRef.current = createWoker(fnString);
  }
  useEffect(() => {}, []);
  return [workRef.current];
};

export default useSharedWorker;
