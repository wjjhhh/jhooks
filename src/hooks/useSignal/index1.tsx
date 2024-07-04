import type { Dispatch, SetStateAction } from 'react';
import React, { useMemo, useReducer, useRef, useEffect } from 'react';

type ComponentProps = {
  keys?: string[];
  mapProps?: (...args: any[]) => any;
};
type Setter<T> = Dispatch<SetStateAction<T>>;
type Excuter = {
  excute: () => void;
} | null;
type Setcurrent<T> = (newValue: T) => void;

const isObject = (data: unknown) => typeof data === 'object';

let excuter: Excuter;
let restoreExcuter: () => void;

function useSignal<T>(initialValue: T): [() => T, Setter<T>, () => T] {
  const valueRef = useRef(initialValue);
  const updateRef = useRef<() => void>();
  const inEffectRef = useRef(false);
  // const setterQueue = useRef<Setcurrent<T>[]>([]);
  const updateFnMap = useRef(new Map());
  const Component = ({ keys, mapProps }: ComponentProps) => {
    const [, forceUpdate] = useReducer(() => ({}), {});
    const componentValue = useRef<T>(valueRef.current);
    const uniKey = useRef(Symbol());
    updateRef.current = forceUpdate;

    useEffect(() => {
      if (inEffectRef.current) {
        restoreExcuter?.();
      }
    });
    useEffect(() => {
      const thisUpdateFn = (newValue: T) => {
        componentValue.current = newValue;
        forceUpdate();
      };
      updateFnMap.current.set(uniKey.current, thisUpdateFn);
      return () => {
        updateFnMap.current.delete(uniKey.current);
      };
    }, []);

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
        const cur = target[key];
        const newKeys = keys?.concat(key);
        if (Array.isArray(target) && key === 'map') {
          return (restProps: ComponentProps['mapProps']) => (
            <Component keys={keys} mapProps={restProps} />
          );
        }
        if (isObject(cur)) {
          return dealDeepValue(cur, newKeys);
        }

        return (<Component keys={newKeys} />) as T;
      },
    });
  };

  const getter = () => {
    // effect
    if (excuter) {
      return valueRef.current;
    }
    // render
    if (isObject(valueRef.current)) {
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
    if (updateFnMap.current.size) {
      updateFnMap.current.forEach((fn) => {
        fn(valueRef.current);
      });
    } else {
      restoreExcuter?.();
      excuter?.excute();
    }

    inEffectRef.current = true;
  };
  const getValue = () => {
    return valueRef.current;
  };
  return [getter, setter, getValue];
}

export function useSignalUpdate(fn: () => void) {
  const excute = () => {
    excuter = updateRef.current;
    fn();
    excuter = null;
  };
  const updateRef = useRef({
    excute: () => {
      excute();
    },
  });

  useEffect(() => {
    restoreExcuter = excute;
    updateRef.current.excute();
  }, []);
}

export default useSignal;
