import { useSharedWorker } from 'jhooks';
import { useState, useEffect } from 'react';

function sharedWorkerJs() {
  self.onconnect = ({ ports }) => {
    ports.forEach((port) => {
      port.onmessage = (ev) => {
        port.postMessage(ev.data);
      };
      port.onmessageerror = (error) => {
        console.log('error', error);
      };
    });
  };
}

export default () => {
  const [worker] = useSharedWorker(sharedWorkerJs);
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
