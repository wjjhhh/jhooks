import type { Dispatch, SetStateAction } from 'react';
import { useRef, useEffect } from 'react';
import { BasicTarget } from '../../types';
import { getTargetElement, isDomElement } from '../../utils';

type InputEle = HTMLInputElement | HTMLTextAreaElement;
type Options = {
  onChange?: ((v: string) => void) | Dispatch<SetStateAction<string>>;
  onSearch?: (v: string) => void;
  active?: Boolean;
};

function useComposition(target: BasicTarget | Options, opts?: Options) {
  const searchValueRef = useRef('');
  const lockRef = useRef(false);
  const _active = !(opts?.active === false);

  const outsideTarget = target && (isDomElement(target) || 'current' in target) ? target : null;
  let _options = !outsideTarget ? (target as Options) : opts;

  const eventProps = {
    onChange: (e: React.ChangeEvent<InputEle>) => {
      if (lockRef.current && _active) {
        return;
      }
      if (e.target) {
        const v = 'value' in e.target ? e.target.value : e.target;
        _options?.onChange?.(v as string);
      }
      
    },
    onCompositionStart: () => {
      lockRef.current = true;
    },
    onCompositionEnd: (e: React.CompositionEvent<InputEle>) => {
      lockRef.current = false;
      if ('onSearch' in _options!) {
        _options.onSearch?.(searchValueRef.current);
        searchValueRef.current = '';
      }
      if ('onChange' in _options!) {
        _options.onChange?.(e.currentTarget.value);
      }
    },
    onSearch: (v: string) => {},
  };
  useEffect(() => {
    if (outsideTarget) {
      const targetElement = getTargetElement(outsideTarget) as InputEle;
      if (targetElement) {
        targetElement.addEventListener(
          'input',
          eventProps.onChange as unknown as EventListenerOrEventListenerObject,
        );
        targetElement.addEventListener('compositionstart', eventProps.onCompositionStart);
        targetElement.addEventListener(
          'compositionend',
          eventProps.onCompositionEnd as unknown as EventListenerOrEventListenerObject,
        );
        return () => {
          targetElement.removeEventListener(
            'input',
            eventProps.onChange as unknown as EventListenerOrEventListenerObject,
          );
          targetElement.removeEventListener('compositionstart', eventProps.onCompositionStart);
          targetElement.removeEventListener(
            'compositionend',
            eventProps.onCompositionEnd as unknown as EventListenerOrEventListenerObject,
          );
        };
      }
    }
  }, [target]);

  if (_options && 'onSearch' in _options) {
    eventProps['onSearch'] = (value: string) => {
      searchValueRef.current = value;
      if (lockRef.current) {
        return;
      }
      _options?.onSearch?.(value);
    };
  } else {
    const { onSearch, ...restProps } = eventProps;
    return restProps;
  }
  return eventProps;
}

export default useComposition;
