import { useEffect, useCallback } from 'react';
import { BasicTarget } from '../../types';
import { getTargetElement } from '../../utils';
import { useSyncExternalStore } from 'use-sync-external-store/shim'
type Position = {
  top: number;
  left: number;
};

let res: Position = {
  top: 0,
  left: 0,
};

function getSnapshot() {
  return res;
}

const subscription = ([onChange, target]: [Function, BasicTarget]) => {

 
  const _onChange = (v: BasicTarget) => {
    if (target === document) {
      res = {
        top: scrollY,
        left: scrollX,
      }
      onChange(v)
      return
    }
    res = {
      top: v.target.scrollTop,
      left: v.target.scrollLeft,
    };
    
    onChange(v, target);
  };
  const ele = getTargetElement(target);
  ele.addEventListener('scroll', _onChange);
  return () => {
    ele.removeEventListener('scroll', _onChange);
  };
};

function useScroll(target: BasicTarget, selector?: (val: Position) => any) {
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
