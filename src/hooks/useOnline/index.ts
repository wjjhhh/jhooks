import { useState, useEffect } from 'react';

export type Callback = (isOnline: boolean) => void 

export default (callback?: Callback) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      callback?.(true);
    };
    const handleOffline = () => {
      setIsOnline(false);
      callback?.(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};
