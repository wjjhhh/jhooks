import { renderHook, act } from '@testing-library/react';
import { useState } from 'react';
import useDeepEffect from '../index';

describe('useDeepEffect', () => {
  it('should be defined', () => {
    expect(useDeepEffect).toBeDefined();
  });

  it('it should be deep compare', () => {
    const hook = renderHook(() => {
      const [n, setN] = useState(0);
      const [obj, setObj] = useState({});
      useDeepEffect(() => {
        setN((prev) => prev + 1);
      }, [obj]);
      return { n, setObj };
    });

    expect(hook.result.current.n).toBe(1);

    act(() => {
      hook.result.current.setObj({});
    });
    expect(hook.result.current.n).toBe(1);
  });
});
