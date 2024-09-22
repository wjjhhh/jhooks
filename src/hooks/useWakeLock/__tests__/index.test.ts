import { renderHook, act } from '@testing-library/react';
import useWakeLock from '..';

describe('useWakeLock', () => {
  const onLock = jest.fn();
  const onRelease = jest.fn();
  const onError = jest.fn();
  const options = { onLock, onRelease, onError };

  beforeAll(() => {
    Object.defineProperty(navigator, 'wakeLock', {
      writable: true,
      value: {
        request: jest.fn().mockResolvedValue({
          addEventListener: jest.fn((event, handler) => {
            console.log('event', event);
            if (event === 'release') {
              setTimeout(handler, 1000);
            }
          }),
          release: jest.fn().mockResolvedValue(undefined),
        }),
      },
    });
  });

  it('should initialize with default values', async () => {
    const { result } = renderHook(() => useWakeLock(options));
    expect(result.current.isSupported).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve));
    });
    expect(result.current.wakeLock).not.toBeNull();
  });

  it('should acquire wake lock and call onLock', async () => {
    const { result } = renderHook(() => useWakeLock(options));

    await act(async () => {
      await result.current.lock();
    });

    expect(navigator.wakeLock.request).toHaveBeenCalledWith('screen');

    expect(result.current.wakeLock).not.toBeNull();

    expect(onLock).toHaveBeenCalled();
  });

  it('should release wake lock and call onRelease', async () => {
    const { result } = renderHook(() => useWakeLock(options));

    await act(async () => {
      await result.current.lock();
      await result.current.release();
    });
    await new Promise((resolve) => setTimeout(resolve, 1100));
    expect(result.current.wakeLock).toBeNull();
    expect(onRelease).toHaveBeenCalled();
  });
  it('should call onError when lock fails', async () => {
    (global.navigator.wakeLock.request as jest.Mock).mockRejectedValue(new Error('Lock failed'));

    const { result } = renderHook(() => useWakeLock(options));

    await act(async () => {
      await result.current.lock();
    });

    expect(options.onError).toHaveBeenCalledWith(expect.any(Error));
  });

  it('should re-acquire wake lock on visibility change', async () => {
    const { result } = renderHook(() => useWakeLock(options));

    expect(navigator.wakeLock.request).toHaveBeenCalledTimes(1);

    await act(async () => {
      await result.current.lock();
    });

    expect(navigator.wakeLock.request).toHaveBeenCalledTimes(2);

    act(() => {
      Object.defineProperty(document, 'visibilitychange', {
        value: 'hidden',
        configurable: true,
      });
      document.dispatchEvent(new Event('visibilitychange'));
    });

    await act(async () => {
      await result.current.lock();
    });

    expect(navigator.wakeLock.request).toHaveBeenCalledTimes(3);
  });
});
