import { MutableRefObject, useLayoutEffect, useRef, useState } from 'react';
import { getTargetElement, isPlainObject } from '../../utils';

interface Options {
  onSuccess?: () => void;
  onError?: () => void;
  trigger?: 'click' | 'dblclick';
  forbid?: boolean;
  onForbid: (e: ClipboardEvent) => void;
}
type TargetValue<T> = T | undefined | null;

type TargetType = HTMLElement | Element | Window | Document;
export type BasicTarget<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | MutableRefObject<TargetValue<T>>;

const isOptions = (target: unknown): target is Options => {
  return !target || isPlainObject(target);
};

function useCopy(target?: BasicTarget | Options, options?: Options) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const valueRef = useRef<string>(null!);
  const [error, setError] = useState<string | null>(null);

  const isInsideRef = isOptions(target);
  let _options = isInsideRef ? target : options;
  const getElement = () => {
    return isInsideRef ? getTargetElement(innerRef) : getTargetElement(target);
  };

  const copy = () => {
    let successful = false;
    let range = document.createRange();
    window?.getSelection()?.removeAllRanges();
    const targetElement = getElement();
    if (targetElement) {
      range.selectNode(targetElement);
      window.getSelection()?.addRange(range);
      successful = document.execCommand('copy');
    }
    if (successful) {
      _options?.onSuccess?.();
      navigator.clipboard.readText().then((res) => {
        valueRef.current = res;
      });
      setError(null);
    } else {
      setError('copy command was unsuccessful');
    }
    // 移除选中的元素
    window?.getSelection()?.removeAllRanges();
  };

  useLayoutEffect(() => {
    const targetElement = getElement();
    const trigger = _options?.trigger || 'click';
    const allowed = !_options?.forbid;

    if (['dblclick', 'click'].includes(trigger) && allowed) {
      targetElement?.addEventListener(trigger, copy);
    }
    const notAllowed = (e: Event) => {
      e.preventDefault();
      _options?.onForbid?.(e as ClipboardEvent);
    };
    if (!allowed) {
      targetElement?.addEventListener('copy', notAllowed);
    }
    return () => {
      if (allowed) {
        targetElement?.removeEventListener(trigger, copy);
      } else {
        targetElement?.removeEventListener('copy', notAllowed);
      }
    };
  }, [target, options]);

  const getValue = () => {
    return valueRef.current;
  };

  if (isInsideRef) {
    return {
      ref: innerRef,
      copy,
      paste: getValue,
      error,
    } as const;
  }

  return {
    copy,
    paste: getValue,
    error,
  } as const;
}

export default useCopy;
