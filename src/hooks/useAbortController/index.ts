import React, { useRef, useEffect, useState } from 'react';
import useForceUpdate from '../useForceUpdate';

export default function useAbortController(unmoutAbort = true) {
  const abc = useRef(new AbortController());
  const selfAbortController = useRef<AbortController>();
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    selfAbortController.current = new AbortController();
    abc.current.signal.addEventListener(
      'abort',
      () => {
        abc.current = new AbortController();
      },
      {
        signal: selfAbortController.current.signal,
      },
    );
    return () => {
      unmoutAbort && abc.current.abort();
      selfAbortController.current?.abort();
    };
  }, [abc.current]);

  return Object.assign(abc.current, {
    restore: () => {
      abc.current = new AbortController();
      forceUpdate();
      
    },
  });

}
