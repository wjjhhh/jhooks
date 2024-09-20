import { useEffect, useState, useRef } from 'react';

type Options = {
    onRelease?: () => void;
    onLock?: () => void;
}

const useWakeLock = (options: Options) => {
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);
  const isSupported = 'wakeLock' in navigator;
  const lock = async () => {
    try {
      const _wakelock = await navigator.wakeLock.request('screen');
      setWakeLock(_wakelock);
      options?.onLock?.();
      _wakelock.addEventListener('release', () => {
        setWakeLock(null);
        options?.onRelease?.();
      });
    } catch (err) {
      console.error(`Failed to acquire wake lock`);
    }
  };
  useEffect(() => {
    if (!isSupported) {
      return;
    }
    lock();
    document.addEventListener('visibilitychange', () => {
      console.log('visibilitychange!!!')
      if (wakeLock && document.visibilityState === 'visible') {
        lock();
      }
    });
    return () => {
      if (wakeLock) {
        wakeLock.release();
      }
    };
  }, []);
  const release = async () => {
    return await wakeLock?.release();
  }
  return { isSupported, wakeLock, release, lock };
};

export default useWakeLock;
