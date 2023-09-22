import type { Dispatch, SetStateAction } from 'react';
import { useRef, useEffect } from 'react';
import { BasicTarget } from '../../types';
import { getTargetElement } from '../../utils';

type InputEle = HTMLInputElement | HTMLTextAreaElement;
type Options = {
  onChange?: ((v: string) => void) | Dispatch<SetStateAction<string>>;
  onSearch?: (v: string) => void;
  active?: Boolean;
};
function useComposition(target, opts: Options = {}) {
  const searchValueRef = useRef('');
  const lockRef = useRef(false);
  const _active = !(opts?.active === false);

  const eventProps = {
    onChange: (e: React.ChangeEvent<InputEle>) => {
      if (lockRef.current && _active) {
        return;
      }
      opts?.onChange?.(e.target.value);
    },
    onCompositionStart: () => {
      lockRef.current = true;
    },
    onCompositionEnd: (e: React.CompositionEvent<InputEle>) => {
      lockRef.current = false;
      if ('onSearch' in opts) {
        opts.onSearch?.(searchValueRef.current);
        searchValueRef.current = '';
      }
      if ('onChange' in opts) {
        opts.onChange?.(e.currentTarget.value);
      }
    },
    onSearch: (v: string) => {},
  };
  useEffect(() => {
    const targetElement = getTargetElement(target);
    if (targetElement) {
      targetElement.addEventListener('input', eventProps.onChange);
      targetElement.addEventListener('compositionstart', eventProps.onCompositionStart);
      targetElement.addEventListener('compositionend', eventProps.onCompositionEnd);
    }
  }, []);

  if ('onSearch' in opts) {
    eventProps['onSearch'] = (value: string) => {
      searchValueRef.current = value;
      if (lockRef.current) {
        return;
      }
      opts?.onSearch?.(value);
    };
  } else {
    const { onSearch, ...restProps } = eventProps;
    return restProps;
  }
  return eventProps;
}

export default useComposition;
