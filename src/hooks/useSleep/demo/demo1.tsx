import React from 'react';
import { useSleep } from 'jhooks';

export default () => {
  const [status, setStatus] = React.useState('idle');
  const { sleep, destory } = useSleep(() => {
    setStatus('destructive');
  });

  const loogOp = async () => {
    setStatus('working');
    await sleep(3000);
    setStatus('working after 3000ms');
    await sleep(2000);
    setStatus('finish');
  };

  return (
    <>
      status: {status}
      <br />
      <button onClick={loogOp}>耗时操作1</button>
      <br />
      <button onClick={destory}>暂停操作1</button>
    </>
  );
};
