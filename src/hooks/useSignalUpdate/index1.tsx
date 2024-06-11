import React, {  useEffect } from 'react';
import { setEffectRun, resetEffectRun } from '../useSignal/index1';

function useSignalUpdate(fn: () => void) {
  useEffect(() => {
    setEffectRun(fn);
    fn();
    return resetEffectRun
  }, []);
}

export default useSignalUpdate;
