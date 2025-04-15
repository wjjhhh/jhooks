import { renderHook, act } from '@testing-library/react';
import useSleep from '..';


describe('useSleep', () => {

  it('should cancel the sleep and not call the provided function', async () => {
    const fn = jest.fn();
    const wakeFn = jest.fn()
    const { result } = renderHook(() => useSleep(fn));

    const run = async () => {
      await result.current.sleep(200);
      wakeFn()
    }
    act(() => {
      run();
      result.current.destory();
    });

    expect(fn).toHaveBeenCalled();
    expect(wakeFn).toHaveBeenCalledTimes(0)
  });

  it('should make the promise cancelable', async () => {
    const fn = jest.fn();
    const { result } = renderHook(() => useSleep(fn));

    const promise = result.current.makeCancelable(new Promise(resolve => setTimeout(resolve, 1000)));

    act(() => {
      result.current.destory();
    });

    await expect(promise).rejects.toEqual({ isCanceled: true });
    expect(fn).toHaveBeenCalled();
  });
});