import { renderHook, act } from '@testing-library/react';
import useForceUpdate from '..';

describe('useForceUpdate', () => {
  it('should be defined', () => {
    expect(useForceUpdate).toBeDefined();
  });

  it('should update', () => {
    let count = 0;
    const hook = renderHook(() => {
      const update = useForceUpdate();
      return {
        onPlus: () => {
          count++;
          update();
        },
        count,
      };
    });
    expect(hook.result.current.count).toEqual(0);
    act(() => {
      hook.result.current.onPlus();
    });
    expect(hook.result.current.count).toEqual(1);
  });
});
