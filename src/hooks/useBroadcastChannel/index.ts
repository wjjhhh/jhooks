import { useRef, useEffect, useState } from 'react';

export default (name: string) => {
  const bcc = useRef<BroadcastChannel>();
  const [data, setData] = useState()
  const [error, setError] = useState<Event>()
  if (!bcc.current) {
    bcc.current = new BroadcastChannel(name);
  }
  const isSupported = 'BroadcastChannel' in window
  useEffect(() => {
    if (bcc.current) {
      bcc.current.addEventListener('message', (e: MessageEvent) => {
        setData(e.data)
      }, { passive: true });

      bcc.current.addEventListener('messageerror', (e: MessageEvent) => {
        setError(e)
      }, { passive: true });

    }
  }, []);

  const post = (_data: unknown) => {
    bcc.current?.postMessage(_data)   
  }
  return {
    isSupported,
    data,
    error,
    post,
  };
};
