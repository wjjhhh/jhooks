import { useSharedWorker } from 'jhooks';
import { useState, useEffect } from 'react';

function sharedWorkerJs() {
  self.onconnect = ({ ports }) => {
    console.log('ports', ports);
    ports.forEach((port) => {
      port.onmessage = (ev) => {
        port.postMessage(ev.data);
      };
      port.onmessageerror = (ev) => {
        console.log('error', ev);
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
    setNum(newNum);
  };
  useEffect(() => {
    worker.port.addEventListener('message', (e) => {
      console.log('doewf', e.data);
      setNum(e.data)
    });
    worker.port.start();
  }, []);
  return (
    <>
      <div>num:{num}</div>
      <button onClick={changeNum}>+</button>
    </>
  );
};
