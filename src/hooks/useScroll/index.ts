import { useEffect, useCallback, useRef } from 'react';
import { BasicTarget } from '../../types';
import { getTargetElement } from '../../utils';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
type Position = {
  top: number;
  left: number;
};
type Status = 'idle' | 'scrolling' | 'scrollend';
type Result = Position | { status: Status };
type Target = BasicTarget | Document;

let res: Result = {
  top: 0,
  left: 0,
  status: 'idle',
};

function getSnapshot() {
  return res;
}
const scrollEndTimer = Symbol('timer')

const isSupportedScrollend = 'onscrollend' in window;

const subscription = ([onChange, target]: [Function, Target]) => {
  target = target || document
  const _onScrollEnd: EventListener = (v) => {
    res = {
      ...res,
      status: 'scrollend',
    };
    onChange(v, target);
  };

  const _onChange: EventListener = (v) => {
    if (target === document) {
      res = {
        top: scrollY,
        left: scrollX,
        status: 'scrolling',
      };
    } else {
      res = {
        top: (v?.target as HTMLElement).scrollTop,
        left: (v?.target as HTMLElement).scrollLeft,
        status: 'scrolling',
      };
    }
  
    if (!isSupportedScrollend) {
      clearTimeout(window[scrollEndTimer]);
      window[scrollEndTimer] = setTimeout(_onScrollEnd, 100);
    }
    onChange(v, target);
  };

  const ele = getTargetElement(target);

  ele?.addEventListener('scroll', _onChange);
  if (isSupportedScrollend) {
    ele?.addEventListener('scrollend', _onScrollEnd);
  }

  return () => {
    ele?.removeEventListener('scroll', _onChange);
    if (isSupportedScrollend) {
      ele?.removeEventListener('scrollend', _onScrollEnd);
    }
  };
};

function useScroll(target?: Target, selector?: (val: Result) => any) {
  useEffect(() => {
    res = {
      top: 0,
      left: 0,
      status: 'idle',
    };
  }, [target]);
  const _subscription = useCallback(
    (onChange: (e: Event) => void) => subscription([onChange, target]),
    [target, selector],
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
