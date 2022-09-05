import type { useEffect, useLayoutEffect } from 'react';
import { useRef } from 'react';

type AppendEffectFunc<T extends typeof useEffect, A> = T extends (...args: infer R) => void
  ? (...args: [...R, A?]) => void
  : never;

type EffectFunc =
  | ((hooks: typeof useEffect) => AppendEffectFunc<typeof useEffect, number>)
  | ((hooks: typeof useLayoutEffect) => AppendEffectFunc<typeof useLayoutEffect, number>);

const createUpdateEffect: EffectFunc = (hook) => (effect, deps, times?: number) => {
  const isMounted = useRef(false);

  if (typeof times === 'undefined') {
    times = Infinity;
  }
  const updateTimes = useRef(0);
  hook(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      if (updateTimes.current < times!) {
        updateTimes.current++;
        return effect();
      }
    }
  }, deps);

  hook(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
};

export default createUpdateEffect;
