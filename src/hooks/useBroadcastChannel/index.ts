import { useRef, useEffect, useState } from 'react';

export default (name: string) => {
  const bcc = useRef<BroadcastChannel>();
  const [data, setData] = useState();
  const [error, setError] = useState<Event>();
  const [isClosed, setIsClosed] = useState(false);
  if (!bcc.current) {
    bcc.current = new BroadcastChannel(name);
  }
  const isSupported = 'BroadcastChannel' in window;
  useEffect(() => {
    if (bcc.current) {
      bcc.current.addEventListener(
        'message',
        (e: MessageEvent) => {
          setData(e.data);
        },
        { passive: true },
      );

      bcc.current.addEventListener(
        'messageerror',
        (e: MessageEvent) => {
          setError(e);
        },
        { passive: true },
      );
      // bcc.current.addEventListener('close', () => {
      //   console.log('close')
      // })
    }
    return () => {
      bcc.current?.close()
    }
  }, []);

  const post = (_data: unknown) => {
    if (isClosed) {
      return
    }
    bcc.current?.postMessage(_data);
  };
  const close = () => {
    bcc.current?.close();
    setIsClosed(true);
  };
  return {
    isSupported,
    data,
    error,
    post,
    isClosed,
    close,
    channel: bcc.current,
  };
};
