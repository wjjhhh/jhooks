import type { useEffect, useLayoutEffect } from 'react';
import { useRef } from 'react';

type EffectFunc =
  | ((hooks: typeof useEffect) => typeof useEffect)
  | ((hooks: typeof useLayoutEffect) => typeof useLayoutEffect);

const createOnceUpdateEffect: EffectFunc = (hook) => (effect, deps) => {
  const isMounted = useRef(false);
  const isUpdated = useRef(false);

  hook(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      if (!isUpdated.current) {
        isUpdated.current = true;
        return effect();
      }
    }
  }, deps);

  hook(() => {
    return () => {
      isUpdated.current = false;
      isMounted.current = false;
    };
  }, []);
};

export default createOnceUpdateEffect;
