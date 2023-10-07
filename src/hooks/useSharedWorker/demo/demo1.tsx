import { useSharedWorker } from 'jhooks';
import { useState, useEffect } from 'react';


export default () => {
  const [worker] = useSharedWorker('/demo1ShareWorker.worker');
  const [num, setNum] = useState(0);
  const changeNum = () => {
    const newNum = num + 1;
    worker.port.postMessage(newNum);
  };
  useEffect(() => {
    worker.port.addEventListener('message', (e: MessageEvent) => {
      setNum(e.data);
    });
  }, []);
  return (
    <>
      <div>num:{num}</div>
      <button onClick={changeNum}>+</button>
    </>
  );
};
