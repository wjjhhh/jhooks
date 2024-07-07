import { useRef } from 'react';
import type { DependencyList, useEffect, useLayoutEffect } from 'react';
type EffectHook = typeof useEffect | typeof useLayoutEffect;

function deepEqual(obj1: Object | void, obj2: Object | void) {
  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }

  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

const createDeepEffect =
  (hook: EffectHook): EffectHook =>
  (effect, deps) => {
    const ref = useRef<DependencyList>();
    const updateRef = useRef({});
    if (deps === undefined || !deepEqual(deps, ref.current)) {
      ref.current = deps;
      updateRef.current = {};
    }
    hook(effect, [updateRef.current]);
  };

export default createDeepEffect;
