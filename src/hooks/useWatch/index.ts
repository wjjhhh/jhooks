import { useRef, useEffect, useState } from 'react';
import { isEqual } from 'lodash-es';

type WatchOptions = {
  immediate?: boolean;
  deep?: boolean;
};

type Callback = (oldValue: any, newValue: any) => void;

export default (dep: any, callback: Callback, options?: WatchOptions) => {
  const isMount = useRef(false);
  const oldValue = useRef(dep);

  const [isWatching, setIsWatching] = useState(true);

  const _options = {
    immediate: false,
    deep: false,
    ...options,
  };
  useEffect(() => {
    if (!isMount.current && !_options.immediate) {
      isMount.current = true;
    } else {
      // 非深比较 或者 深比较不相同
      if ((!_options.deep || !isEqual(oldValue.current, dep)) && isWatching) {
        callback(dep, oldValue.current);
      }
    }
    oldValue.current = dep;
  }, [dep]);

  return {
    cancel: () => setIsWatching(false),
    run: () => setIsWatching(true),
    isWatching,
  } as const;
};
