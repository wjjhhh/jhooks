import { useEffect, useRef, useState } from 'react';

export type UseBaseReturnType = {
  base64: string;
  isSupported: boolean;
  promise: Promise<string>;
};

type Callback = (base64: string) => void;

function toBase64(_target: Blob | string) {
  return new Promise<string>((resolve, reject) => {

    const reader = new FileReader();

    if (typeof _target === 'string') {
      reader.readAsDataURL(new Blob([_target], { type: 'text/plain' }));
    } else if (_target instanceof Blob) {
      reader.readAsDataURL(_target);
    }

    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.onerror = reject;
  });
}

function useBase64(target: File, callback?: Callback): UseBaseReturnType;
function useBase64(target: string, callback?: Callback): UseBaseReturnType;
function useBase64(target: any, callback?: Callback) {
  const [base64, setBase64] = useState('');
  const isSupported = useRef<boolean>();
  const promise = useRef<Promise<string>>(new Promise(() => ''));
  if (isSupported.current === void 0) {
    isSupported.current = typeof FileReader !== void 0;
  }
  const exc = async (_target: Blob | string) => {
    // const res = await toBase64(_target);
    // // callback?.(res)
    // setBase64(res);
    promise.current = new Promise((resolve, reject) => {
      resolve(toBase64(_target));
    });
    promise.current.then((res) => {
      setBase64(res);
    });
  };
  useEffect(() => {
    exc(target);
  }, [target]);
  return {
    base64,
    isSupported: isSupported.current,
    promise: promise.current,
  };
}

export default useBase64;
