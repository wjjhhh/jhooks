import { renderHook, act } from '@testing-library/react';
import useSleep from '..';

describe('useSleep', () => {
  it('should call the provided function after the specified time', async () => {
    const fn = jest.fn();
    const { result } = renderHook(() => useSleep(fn));

    act(() => {
      result.current.sleep(1000);
    });

    await act(async () => {
      await result.current.sleep(1000);
    });

    expect(fn).toHaveBeenCalledTimes(0);
  });

  it('should cancel the sleep and not call the provided function', async () => {
    const fn = jest.fn();
    const { result } = renderHook(() => useSleep(fn));

    act(() => {
      result.current.sleep(1000);
      result.current.destory();
    });

    await act(async () => {
      await result.current.sleep(1000);
    });

    expect(fn).toHaveBeenCalled();
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