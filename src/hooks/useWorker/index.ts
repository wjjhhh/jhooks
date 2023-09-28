import { useMemo, useEffect } from 'react';

function createWoker(f: string, options?: WorkerOptions) {
  let code = f.toString();
  code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));
  const blob = new Blob([code], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);

  return new Worker(url, options);
}

const useWoker = (fnString: string, options?: WorkerOptions) => {
  let worker = createWoker(fnString, options);
  useEffect(() => {
    return () => {
      worker.terminate();
    };
  }, []);
  return [worker];
};

export default useWoker;
