import { useEffect, useRef } from 'react';
import { preciseSetTimeout, getTargetElement } from '@/utils';
import type { TargetType } from '@/utils';

type Options = {
  delay: number;
  onClick?: (event: Event) => void;
};

const useDoubleClick = (target: TargetType, doubleClick: Function, options: Options) => {
  const timerRef = useRef<(() => void) | null>(null);
  const hasClicked = useRef(false);
  const effect: EventListener = (event) => {
    timerRef.current?.();

    hasClicked.current = !hasClicked.current;

    timerRef.current = preciseSetTimeout(() => {
      if (hasClicked.current) {
        options.onClick?.(event);
      } else {
        timerRef.current?.();
        hasClicked.current = false;
        doubleClick();
      }
      hasClicked.current = false;
    }, options.delay);
  };
  useEffect(() => {
    const targetElement = getTargetElement(target);
    targetElement?.addEventListener('click', effect);
    return () => {
      targetElement?.removeEventListener('click', effect);
      timerRef.current?.();
    };
  }, [target, doubleClick, options]);
};

export default useDoubleClick;
