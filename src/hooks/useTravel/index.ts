// @ts-nocheck
import { useRef, useState, useCallback } from 'react';
import Travel from '../../utils/Travel';

const useTravel = (initialValue?: any, maxLength?: number) => {
  const travelRef = useRef(new Travel(initialValue, maxLength));
  const travel = travelRef.current;

  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue: useCallback((newValue, isCover: boolean = false) => {
      return setValue(travel.setValue(newValue, isCover));
    }, []),
    backLength: travel.getBackLength(),
    forwardLength: travel.getForwardLength(),
    go: useCallback((step?) => {
      const res = travel.go(step);
      setValue(res);
      return res;
    }, []),
    back: useCallback((step?) => {
      const res = travel.back(step);
      setValue(res);
      return res;
    }, []),
    forward: useCallback((step?) => {
      const res = travel.forward(step);
      setValue(res);
      return res;
    }, []),

    reset: useCallback((...params) => {
      const res = travel.reset(params.length ? params[0] : initialValue);
      setValue(res);
      return res;
    }, []),
  };
};

export default useTravel;
