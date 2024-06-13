import { useEffect, useRef } from 'react';
import useSignal, { setEffectRun, resetEffectRun } from '../useSignal/index1';

function useSignalUpdate(fn: () => void) {
  const symbol = useRef(Symbol())
  
  useEffect(() => {
    setEffectRun(fn, symbol.current);
    fn();
    
    return () => resetEffectRun(symbol.current);
  }, []);
}

export default useSignalUpdate;
