import React, { useEffect, useState, useRef, useId } from 'react';
import { useAbortController } from 'jhooks';

const Com = ({
  id,
  setCount,
}: {
  id: string;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const abc = useAbortController();
  const { signal } = abc;

  useEffect(() => {
    document.getElementById(id)?.addEventListener(
      'click',
      () => {
        
        setCount((preCount) => preCount + 1);
      },
      { signal },
    );
    
  }, []);

  return null;
};

export default () => {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const id = useId();
  return (
    <>
      count: {count}
      <button id={id}>点我+1</button>
      <br />
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? '卸载事件' : '绑定事件'}
      </button>
      {visible && <Com id={id} setCount={setCount} />}
    </>
  );
};
