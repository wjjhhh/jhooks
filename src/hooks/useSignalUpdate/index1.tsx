import React, {  useEffect } from 'react';
import { setEffectRun } from '../useSignal/index1';

function useSignalUpdate(fn: () => void) {
  useEffect(() => {
    setEffectRun(fn);
    fn();
  }, []);
}

export default useSignalUpdate;
