import type { useEffect, useLayoutEffect } from 'react';
import { useRef } from 'react';

type EffectHookType = typeof useEffect | typeof useLayoutEffect;
type FuncType = (hook: EffectHookType) => EffectHookType;

const createUnStrictHook: FuncType = (hook) => (effect, deps) => {
  const isFirst = useRef(true);

  hook(() => {
    return () => {
      isFirst.current = false;
    };
  }, []);

  hook(() => {
    if (isFirst.current) {
      return;
    }
    return effect();
  }, [deps]);
};

export default createUnStrictHook;
