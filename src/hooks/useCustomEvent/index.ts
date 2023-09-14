import { useEffect } from 'react';

function useCustomEvent(
  name: string,
  options: { onChange: (event: Event) => void },
) {
  if (!name || typeof name !== 'string') {
    throw('name must be a Non empty string')
  }
  const dispatch = (data: any) => {
    document.dispatchEvent(new CustomEvent(name, { detail: data }));
  };

  useEffect(() => {
    if (typeof options?.onChange === 'function') {
      document.addEventListener(name, options.onChange);
      return () => {
        document.removeEventListener(name, options.onChange);
      };
    }
  }, [name]);
  return {
    dispatch,
  };
}

export default useCustomEvent;
