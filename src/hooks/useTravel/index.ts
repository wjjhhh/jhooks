import { useRef, useState, useCallback } from 'react';
import Travel from '../../utils/Travel';
import {  useForceUpdate } from '../..'

const useTravel = (initialValue?: any, maxLength?: number) => {
  const travelRef = useRef(new Travel(initialValue, maxLength));
  const travel = travelRef.current;
  const update = useForceUpdate()
  const [value, setValue] = useState(initialValue);
 
  return {
    value,
    setValue: useCallback((newValue: any, overwrite: boolean = false) => {
      update()
      return setValue(travel.setValue(newValue, { overwrite }));
    }, []),
    backLength: travel.getBackLength(),
    forwardLength: travel.getForwardLength(),
    go: useCallback((step?: number) => {
      const res = travel.go(step);
      setValue(res);
      return res;
    }, []),
    back: useCallback((step?: number) => {
      const res = travel.back(step);
      setValue(res);
      return res;
    }, []),
    forward: useCallback((step?: number) => {
      const res = travel.forward(step);
      setValue(res);
      return res;
    }, []),

    reset: useCallback((...params: any) => {
      const res = travel.reset(params.length ? params[0] : initialValue);
      setValue(res);
      return res;
    }, []),
  };
};

export default useTravel;
