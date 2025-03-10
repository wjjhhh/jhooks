import React, { useEffect, useState, useRef, useId } from 'react';
import { useAbortController } from '@wjjhhh/jhooks';

const Com = ({
  plusId,
  minId,
  setCount,
}: {
  plusId: string;
  minId: string;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const abc = useAbortController();
  const { signal } = abc;

  useEffect(() => {
    document.getElementById(plusId)?.addEventListener(
      'click',
      () => {
        setCount((preCount) => preCount + 1);
      },
      { signal },
    );
    document.getElementById(minId)?.addEventListener(
      'click',
      () => {
        setCount((preCount) => preCount - 1);
      },
      {
        signal,
      },
    );
  }, []);

  return null;
};

export default () => {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const plusId = useId();
  const minId = useId();
  return (
    <>
      count: {count}
      <button id={plusId}>单击我+1</button>
      <button id={minId}>单击我-1</button>
      <br />
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? '卸载事件' : '绑定事件'}
      </button>
      {visible && <Com plusId={plusId} minId={minId} setCount={setCount} />}
    </>
  );
};
