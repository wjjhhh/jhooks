import { useEffect, useCallback } from 'react';
import { BasicTarget } from '../../types';
import { getTargetElement } from '../../utils';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
type Position = {
  top: number;
  left: number;
};
type Status = 'idle' | 'scrolling' | 'scrollend'
type Result = Position | { status: Status }
type Target = BasicTarget | Document;

let res: Result = {
  top: 0,
  left: 0,
  status: 'idle'
};

function getSnapshot() {
  return res;
}

const subscription = ([onChange, target]: [Function, Target]) => {
 
  if (target === document) {
    res = {
      top: scrollY,
      left: scrollX,
    };

    return onChange();
  }
  const _onChange: EventListener = (v) => {
    res = {
      top: (v?.target as HTMLElement).scrollTop,
      left: (v?.target as HTMLElement).scrollLeft,
      status: 'scrolling'
    };
    onChange(v, target);
  };
  const _onScrollEnd: EventListener = (v) => {
    res = {
      ...res,
      status: 'scrollend'
    }
    onChange(v, target)
  }
  const ele = getTargetElement(target);
  ele?.addEventListener('scroll', _onChange);
  ele?.addEventListener('scrollend', _onScrollEnd)
  return () => {
    ele?.removeEventListener('scroll', _onChange);
    ele?.removeEventListener('scrollend', _onScrollEnd);
  };
};

function useScroll(target: Target, selector?: (val: Result) => any) {
  useEffect(() => {
    res = {
      top: 0,
      left: 0,
      status: 'idle'
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
