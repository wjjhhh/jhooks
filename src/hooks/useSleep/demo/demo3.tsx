import React, { useState } from 'react';
import { useSleep } from '@wjjhhh/jhooks';

export default () => {
  const [status, setStatus] = useState('idle');
  const { sleep, destory } = useSleep(() => {
    setStatus('destructive');
  });
  const [progress, setProgress] = useState(0)
  const start = async () => {
    setStatus('sleeping');
    await sleep(3000, (_progress: number) => {
      setProgress(_progress)
    });
    setStatus('wake');

  };

  return (
    <>
      status: {status}
      <br />
      <button onClick={start}>开始睡眠</button>
      <div>进度:{progress}</div>
      <br />
      <button onClick={() => {
        destory()
        setStatus('paused')
      }}>暂停</button>
    </>
  );
};
