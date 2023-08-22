import { useEffect, useRef, useState } from 'react';

export type UseBaseReturnType = {
  base64: string;
  isSupported: boolean;
};

function toBase64(blob: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = (e) => {
        resolve(e.target?.result)
    };
    reader.onerror = reject
  });
}

function useBase64(target: string): UseBaseReturnType;
function useBase64(target: any) {
  const [base64, setBase64] = useState('');
  const isSupported = useRef<boolean>();
  if (isSupported.current === void 0) {
    isSupported.current = typeof FileReader !== void 0;
  }
  useEffect(() => {
    if (typeof target === 'string') {
        setBase64(btoa(target))
    }
  }, [target])
  return {
    base64,
    isSupported: isSupported.current,
  };
}

export default useBase64;
