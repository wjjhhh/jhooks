import type { Dispatch, SetStateAction } from 'react';
import { useRef } from 'react';

type InputEle = HTMLInputElement | HTMLTextAreaElement;
type Options = {
  onChange?: ((v: string) => void) | Dispatch<SetStateAction<string>>;
  onSearch?: (v: string) => void;
};
function useInput(opts: Options = {}) {
  const searchValueRef = useRef('');
  const lockRef = useRef(false);
  const eventProps = {
    onChange: (e: React.ChangeEvent<InputEle>) => {
      if (lockRef.current) {
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

export default useInput;
