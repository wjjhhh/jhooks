import { useEffect } from 'react';
function useCustomEvent<T>(
  name: string,
  options: { onChange: EventListenerOrEventListenerObject },
) {
  const dispatch = (data: T) => {
    document.dispatchEvent(new CustomEvent(name, { detail: data }));
  };

  useEffect(() => {
    if (typeof options?.onChange === 'function') {
      document.addEventListener(name, options.onChange);
      return () => {
        document.removeEventListener(name, options.onChange);
      };
    }
  }, [name, options]);
  return {
    dispatch,
  };
}

export default useCustomEvent;
