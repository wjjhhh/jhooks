import type { Dispatch, SetStateAction } from 'react';
import React, { useMemo, useReducer, useRef } from 'react';

type WrapperProps = {
  keys?: string[];
  mapProps?: (...args: any[]) => any;
};

const isPlainObject = (data: unknown) => typeof data === 'object';

function useSignal<T>(initialValue: T): [() => T, Dispatch<SetStateAction<T>>, () => T] {
  const valueRef = useRef(initialValue);
  const updateRef = useRef<() => void>();
  const Wrapper = ({ keys = [], mapProps }: WrapperProps) => {
    const [, s] = useReducer(() => ({}), {});
    updateRef.current = s;
   
    if (Array.isArray(keys)) {
      const value = keys.reduce((obj: any, key: string) => obj[key], valueRef.current);
      if (mapProps) {
        return value.map(mapProps)
      }
      return value
    }
    return valueRef.current;
  };
  const dealDeepValue = (value: any, keys?: string[]): T => {
    return new Proxy(value, {
      get: (target, key: string) => {
        console.log('target', target, key)
        const cur = target[key];
        const newKeys = keys?.concat(key);
        if (Array.isArray(target) && key === 'map') {
            return (restProps: WrapperProps['mapProps']) => <Wrapper keys={keys} mapProps={restProps} />
        }
        if (isPlainObject(cur)) {
          
          return dealDeepValue(cur, newKeys);
        }

        return (<Wrapper keys={newKeys} />) as T;
      },
    });
  };

  const getter = () => {
    if (isPlainObject(valueRef.current)) {
      return dealDeepValue(valueRef.current, []);
    }
    return (<Wrapper />) as T;
  };
  const setter = (newValue: SetStateAction<T>) => {
    if (typeof newValue === 'function') {
      valueRef.current = (newValue as Function)?.(valueRef.current);
    } else {
      valueRef.current = newValue;
    }
    updateRef.current?.();
  };
  const getValue = () => {
    return valueRef.current
  };
  return useMemo(() => [getter, setter, getValue], []);
}

export default useSignal;
