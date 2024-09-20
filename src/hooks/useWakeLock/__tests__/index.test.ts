import { renderHook, act } from '@testing-library/react';
import useWakeLock from '..';

describe('useWakeLock', () => {
  const onLock = jest.fn();
  const onRelease = jest.fn();
  const options = { onLock, onRelease };

  beforeAll(() => {
    Object.defineProperty(navigator, 'wakeLock', {
      writable: true,
      value: {
        request: jest.fn().mockResolvedValue({
          addEventListener: jest.fn((event, handler) => {
            if (event === 'release') {
              handler();
            }
          }),
          release: jest.fn().mockResolvedValue(undefined),
        }),
      },
    });
  });

  //   it('should initialize with default values', () => {
  //     const { result } = renderHook(() => useWakeLock(options));
  //     expect(result.current.isSupported).toBe(true);
  //     expect(result.current.wakeLock).toBeNull();
  //   });

  //   it('should acquire wake lock and call onLock', async () => {
  //     const { result } = renderHook(() => useWakeLock(options));

  //     await act(async () => {
  //       await result.current.lock();
  //     });

  //     expect(navigator.wakeLock.request).toHaveBeenCalledWith('screen');
  //     expect(result.current.wakeLock).not.toBeNull();
  //     expect(onLock).toHaveBeenCalled();
  //   });

  // it('should release wake lock and call onRelease', async () => {
  //   const { result } = renderHook(() => useWakeLock(options));

  //   await act(async () => {
  //     await result.current.lock();
  //     await result.current.release();
  //   });

  //   expect(result.current.wakeLock).toBeNull();
  //   expect(onRelease).toHaveBeenCalled();
  // });

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
        })
        document.dispatchEvent(new Event('visibilitychange'));
      });

      await act(async () => {
        await result.current.lock();
      });

      expect(navigator.wakeLock.request).toHaveBeenCalledTimes(3);
    });
});
