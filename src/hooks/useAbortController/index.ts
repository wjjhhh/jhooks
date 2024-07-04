import React, { useRef, useEffect, useState } from 'react';
import useForceUpdate from '../useForceUpdate';

type Props = {
  /** 卸载时自动abort */
  unmoutAbort?: boolean;
  /** abort后自动重新创建signal */
  recovery?: boolean;
}

export default function useAbortController(props: Props = {}) {
  const { unmoutAbort, recovery } = {
    unmoutAbort: true,
    recovery: false,
    ...props,
  }
  const abc = useRef(new AbortController());
  const forceUpdate = useForceUpdate();
  const restore = () => {
    if (recovery) {
      abc.current = new AbortController();
      abc.current.signal.addEventListener('abort', restore)
      forceUpdate()
    }
  
  }
 
  useEffect(() => {
    abc.current.signal.addEventListener(
      'abort',
      restore
    );
    return () => {
      unmoutAbort && abc.current.abort();
    };
  }, [recovery, unmoutAbort]);

  return Object.assign(abc.current, {
    restore,
  });

}
