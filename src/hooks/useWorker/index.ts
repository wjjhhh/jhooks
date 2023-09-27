import { useMemo, useEffect } from 'react';

function createWoker(f: string) {
  let code = f.toString();
  code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));
  const blob = new Blob([code], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);

  return new Worker(url);
}

const useWoker = (fnString: string) => {
  let worker = createWoker(fnString);
  useEffect(() => {
    return () => {
      worker.terminate();
    };
  }, []);
  return [worker];
};

export default useWoker;
