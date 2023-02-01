import { useEffect, useCallback } from 'react';
import { BasicTarget } from '../../types';
import { getTargetElement } from '../../utils';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
type Position = {
  top: number;
  left: number;
};
type Target = BasicTarget | Document;

let res: Position = {
  top: 0,
  left: 0,
};

function getSnapshot() {
  return res;
}

const subscription = ([onChange, target]: [Function, Target]) => {
  const _onChange: EventListener = (v) => {
    if (target === document) {
      res = {
        top: scrollY,
        left: scrollX,
      };
      onChange(v);
      
    } else {
      res = {
        top: (v?.target as HTMLElement).scrollTop,
        left: (v?.target  as HTMLElement).scrollLeft,
      };

      onChange(v, target);
      const ele = getTargetElement(target);
      ele?.addEventListener('scroll', _onChange);
      return () => {
        ele?.removeEventListener('scroll', _onChange);
      };
    }
  };
  return () => {}
};

function useScroll(target: Target, selector?: (val: Position) => any) {
  useEffect(() => {
    res = {
      top: 0,
      left: 0,
    };
  }, [target]);
  const _subscription = useCallback(
    (onChange: (e: Event) => void) => subscription([onChange, target]),
    [target],
  );
  const _getSnapshot = useCallback(() => {
    if (selector) {
      return selector(getSnapshot());
    }
    return getSnapshot();
  }, [target, selector]);
  return useSyncExternalStore(_subscription, _getSnapshot);
}

export default useScroll;
