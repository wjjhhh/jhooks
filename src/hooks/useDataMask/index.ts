import { useRef, useState, useEffect } from 'react';
import { useUpdateEffect } from '../..';

type Options = {
  pattern?: RegExp;
  mask?: string;
  replacer?: (value: any) => string;
  request?: () => Promise<string>;
};

const defaultOptions = {
  pattern: /./g,
  mask: '*',
  replacer: undefined,
  request: undefined,
};

export default function useDataMask(initialValue: string | number | Options, options?: Options) {
  let _options: Options;
  let _initialValue = '';
  if (['number', 'string'].includes(typeof initialValue)) {
    _initialValue = initialValue as string;
    _options = {
      ...defaultOptions,
      ...options,
    };
  } else {
    _options = initialValue as Options;
  }
  const wrapper = (data?: string | number) => {
    if (typeof data === 'number') {
      data = data + '';
    }
    if (typeof data !== 'string') {
      return data;
    }
    if (typeof _options?.replacer === 'function') {
      return _options.replacer(data);
    }

    if (_options?.pattern) return data.replace(_options.pattern, _options.mask!);
  };
  const plainTextRef = useRef(_initialValue);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(wrapper(_initialValue));
  useUpdateEffect(() => {
    plainTextRef.current = _initialValue;
    setData(wrapper(_initialValue));
  }, [_initialValue]);
  useUpdateEffect(() => {
    fetch();
  }, [visible]);

  const fetch = async () => {
    if (typeof _options?.request === 'function') {
      const res = await Promise.resolve(_options.request?.());
      plainTextRef.current = res;
      setData(res);
    }
  };

  const show = () => {
    setData(plainTextRef.current);
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);

    setData(wrapper(plainTextRef.current));
  };
  const toggle = () => {
    visible ? hide() : show();
  };

  return {
    // wrapper,
    show,
    hide,
    visible,
    toggle,
    data,
  } as const;
}
