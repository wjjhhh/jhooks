import { renderHook } from '@testing-library/react-hooks';
import useOnceUpdateEffect from '..';

describe('useOnceUpdateEffect', () => {
  it('should update once', () => {
    let num = 0;
    const hook = renderHook(() => {
      useOnceUpdateEffect(() => {
        num = 2;
      }, [num]);
    });
    expect(num).toEqual(0);
    hook.rerender();
    expect(num).toEqual(0);
    num = 99;
    hook.rerender();
    expect(num).toEqual(2);
  });
});
