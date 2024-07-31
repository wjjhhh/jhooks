import { renderHook } from '@testing-library/react';
import useUpdateLayoutEffect from '..';


describe('useUpdateLayoutEffect', () => {
  it('should update', () => {
    let num = 0;
    const hook = renderHook(() => {
      useUpdateLayoutEffect(() => {
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
      useUpdateLayoutEffect(
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