import type { useEffect, useLayoutEffect } from 'react';
import { useRef } from 'react';


type AppendEffectFunc<T extends  typeof useEffect, A> = T extends (...args: infer R) => void ? (...args: [...R, A?]) => void : never

type EffectFunc =
  | ((hooks: typeof useEffect) =>  AppendEffectFunc<typeof useEffect, false | number>)
  | ((hooks: typeof useLayoutEffect) => AppendEffectFunc<typeof useLayoutEffect, false | number>);


const createOnceUpdateEffect: EffectFunc = (hook) => (effect, deps, times?: false | number) => {
  const isMounted = useRef(false);

  if (typeof times === 'undefined') {
    times = 1;
  }
  const updateTimes = useRef(0);
  hook(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      if (times === false) {
        return effect();
      }

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

export default createOnceUpdateEffect;
