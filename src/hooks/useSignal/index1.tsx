import type { Dispatch, SetStateAction } from 'react';
import React, { useMemo, useReducer, useRef, useEffect } from 'react';

type WrapperProps = {
  keys?: string[];
  mapProps?: (...args: any[]) => any;
};

const isPlainObject = (data: unknown) => typeof data === 'object';
let flag = false;
let effectRun: (() => void) | null;
let updateMap = new Map();

export function setEffectRun(fn: typeof effectRun, sb: symbol): void {
  updateMap.set(sb, fn);
}

export function resetEffectRun(sb: symbol): void {
  updateMap.delete(sb);
}

function useSignal<T>(initialValue: T): [() => T, Dispatch<SetStateAction<T>>, () => T] {
  const valueRef = useRef(initialValue);
  const updateRef = useRef<() => void>();
  const inEffectRef = useRef(false)
  const setterQueue = useRef([])
  const Component = ({ keys = [], mapProps }: WrapperProps) => {
    const [, s] = useReducer(() => ({}), {});
    const componentValue = useRef(valueRef.current)
    const isMounted = useRef(false)
    updateRef.current = s;
    useEffect(() => {
      
      if (inEffectRef.current && isMounted.current) {
        inEffectRef.current = false
      }
    })
    useEffect(() => {
      // setterQueue.current.forEach((setter) => setter())
      inEffectRef.current = true
      isMounted.current = true
      return () => {
        isMounted.current = false
        inEffectRef.current = false
      }
    }, [])
 
    if (Array.isArray(keys)) {
      const value = keys.reduce((obj: any, key: string) => obj[key], valueRef.current);
      if (mapProps) {
        return value.map(mapProps);
      }
      return value;
    }
    
    return componentValue.current;
  };
  const dealDeepValue = (value: any, keys?: string[]): T => {
    return new Proxy(value, {
      get: (target, key: string) => {
        console.log('target', target, key);
        const cur = target[key];
        const newKeys = keys?.concat(key);
        if (Array.isArray(target) && key === 'map') {
          return (restProps: WrapperProps['mapProps']) => (
            <Component keys={keys} mapProps={restProps} />
          );
        }
        if (isPlainObject(cur)) {
          return dealDeepValue(cur, newKeys);
        }

        return (<Component keys={newKeys} />) as T;
      },
    });
  };

  const getter = () => {
    if (inEffectRef.current) {
      return valueRef.current
    }
    if (isPlainObject(valueRef.current)) {
      return dealDeepValue(valueRef.current, []);
    }
    return (<Component />) as T;
  };
  const setter = (newValue: SetStateAction<T>) => {
    if (typeof newValue === 'function') {
      valueRef.current = (newValue as Function)?.(valueRef.current);
    } else {
      valueRef.current = newValue;
    }
    inEffectRef.current = true
    updateRef.current?.();
    for (const effectRun of updateMap.values()) {
      effectRun();
    }
    
  };
  const getValue = () => {
    return valueRef.current;
  };
  return useMemo(() => [getter, setter, getValue], []);

  // return [getter, setter, getValue]
}

export default useSignal;
