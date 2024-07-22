import { renderHook, act } from '@testing-library/react';
import useOnline from '..';

describe('useOnline', () => {
  it('should return the initial online status', () => {
    const { result } = renderHook(() => useOnline());
    expect(result.current).toBe(true);
  });

  it('should update the online status when online event is triggered', () => {
    const { result } = renderHook(() => useOnline());

    expect(result.current).toBe(true);
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    expect(result.current).toBe(false);
    act(() => {
      window.dispatchEvent(new Event('online'));
    });

    expect(result.current).toBe(true);
  });

  it('should call the provided callback when online status changes', () => {
    const callback = jest.fn();
    renderHook(() => useOnline(callback));
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    expect(callback).toHaveBeenCalledWith(false);
    act(() => {
      window.dispatchEvent(new Event('online'));
    });

    expect(callback).toHaveBeenCalledWith(true);
  });
});
