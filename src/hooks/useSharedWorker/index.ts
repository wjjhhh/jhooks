import { useEffect, useRef } from 'react';

function createWoker(f: string, options?: WorkerOptions) {
  return new SharedWorker('/demo1SharedWorker.worker.js', options);
}

const useSharedWorker = (fnString: string) => {
  
  const workRef = useRef<SharedWorker>();
  if (!workRef.current) {
    workRef.current = createWoker(fnString);
  }
  useEffect(() => {
    workRef.current?.port.start()
    return () => {
      workRef.current?.port.close();
    }
  }, []);
  return [workRef.current];
};

export default useSharedWorker;
