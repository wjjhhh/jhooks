import { renderHook } from '@testing-library/react-hooks';
import useOnceUpdateLayoutEffect from '..';

describe('useOnceUpdateEffect', () => {
  it('should update once', () => {
    let num = 10;
    const hook = renderHook(() => {
      useOnceUpdateLayoutEffect(() => {
        num = 22;
      }, [num]);
    });
    expect(num).toEqual(10);
    hook.rerender();
    expect(num).toEqual(10);
    num = 99;
    hook.rerender();
    expect(num).toEqual(22);
  });
});
