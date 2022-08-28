import { act, renderHook } from '@testing-library/react-hooks';
import { useEffect, useLayoutEffect, useState } from 'react';
import createOnceUpdateEffect from '..';

describe('createOnceUpdateEffect', () => {
  it('should work for useEffect', () => {
    const useOnceUpdateEffect = createOnceUpdateEffect(useEffect);
    const hook = renderHook(() => {
      const [num, setNum] = useState(0);
      const [toggle, setToggle] = useState(false);
      useOnceUpdateEffect(() => {
        setNum((n) => n + 10);
      }, [toggle]);
      return { num, setToggle };
    });
    expect(hook.result.current.num).toEqual(0);
    act(() => {
      hook.result.current.setToggle(true);
    });
    expect(hook.result.current.num).toEqual(10);
  });

  it('should work for useLayoutEffect', () => {
    const useOnceUpdateEffect = createOnceUpdateEffect(useLayoutEffect);
    const hook = renderHook(() => {
      const [num, setNum] = useState(0);
      const [toggle, setToggle] = useState(false);
      useOnceUpdateEffect(() => {
        setNum((n) => n + 11);
      }, [toggle]);
      return { num, setToggle };
    });
    expect(hook.result.current.num).toEqual(0);
    act(() => {
      hook.result.current.setToggle(true);
    });
    expect(hook.result.current.num).toEqual(11);
  });
});
