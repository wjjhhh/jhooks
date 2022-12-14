import { act, renderHook } from '@testing-library/react';
import { useEffect, useLayoutEffect, useState } from 'react';
import createUpdateEffect from '..';

describe('createUpdateEffect', () => {
  it('should work for useEffect', () => {
    const useUpdateEffect = createUpdateEffect(useEffect);
    const hook = renderHook(() => {
      const [num, setNum] = useState(0);
      const [toggle, setToggle] = useState(false);
      useUpdateEffect(() => {
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
    const useUpdateEffect = createUpdateEffect(useLayoutEffect);
    const hook = renderHook(() => {
      const [num, setNum] = useState(0);
      const [toggle, setToggle] = useState(false);
      useUpdateEffect(() => {
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
