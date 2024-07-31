import { renderHook } from '@testing-library/react';
import useUpdateEffect from '..';

describe('useUpdateEffect', () => {
  it('should update', () => {
    let num = 0;
    const hook = renderHook(() => {
      useUpdateEffect(() => {
        num++;
      });
    });
    expect(num).toEqual(0);
    hook.rerender();
    expect(num).toEqual(1);
    hook.rerender();
    expect(num).toEqual(2);
  });
  it('should update once', () => {
    let num = 0;
    const hook = renderHook(() => {
      useUpdateEffect(
        () => {
          num++;
        },
        void 0,
        1,
      );
    });
    expect(num).toEqual(0);
    hook.rerender();
    expect(num).toEqual(1);
    hook.rerender();
    expect(num).toEqual(1);
  });
});
