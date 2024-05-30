import type { Dispatch, SetStateAction } from 'react';
import React, { useMemo, useReducer, useRef } from 'react';
type Getter<T> = () => T;
type Setter<T> = Dispatch<SetStateAction<T>>;

const isObject = (data: unknown) => typeof data === 'object';

function useSignal<T>(initialValue: T): [() => T, Dispatch<SetStateAction<T>>] {
  const valueRef = useRef(initialValue);
  const updateRef = useRef<() => void>();
  const Wrapper = ({ keys = [] }: { keys?: string[] }) => {
    const [, s] = useReducer(() => ({}), {});

    updateRef.current = s;
    if (keys.length) {
      return keys.reduce((obj: any, key: string) => obj[key], valueRef.current);
    }
    return valueRef.current;
  };
  const dealDeepValue = (value: any, keys?: string[]): T => {
    return new Proxy(value, {
      get: (target, key: string) => {
        const cur = target[key];
        const newKeys = keys?.concat(key);
        if (isObject(cur)) {
          return dealDeepValue(cur, newKeys);
        }

        return (<Wrapper keys={newKeys} />) as T;
      },
    });
  };

  const getter = () => {
    if (isObject(valueRef.current)) {
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
  return useMemo(() => [getter, setter], []);
}

export default useSignal;
