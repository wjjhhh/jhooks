import { useState, useRef, useMemo } from 'react';

const useStateFromProps = <T>(props: any) => {
  const [, forceUpdate] = useState({});
  const oldValue = useRef<T>(props);
  const curValue = useRef<T>(props);
  if (oldValue.current !== props) {
    oldValue.current = props;
    curValue.current = props;
  }
  return useMemo(
    () => [
      curValue.current,
      (prevState: T) => {
        const updatedValue =
          typeof prevState === 'function' ? prevState(curValue.current) : prevState;
        curValue.current = updatedValue;
        forceUpdate({});
        return updatedValue;
      },
    ],
    [props, curValue.current],
  );
};

export default useStateFromProps;
