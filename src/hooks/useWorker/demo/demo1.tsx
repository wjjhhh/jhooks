import { useWorker } from 'jhooks';
import { useMemo, useEffect, useState, useLayoutEffect } from 'react';
import myWorker from './demo1Woker';

export default () => {
  const [worker] = useWorker(myWorker);

  const [data, setData] = useState();
  useEffect(() => {
    worker.onmessage = function (e: MessageEvent) {
      setData(e.data)
    };
  }, []);
  return (
    <>
        
        <button onClick={() => worker.postMessage(30)}>递归计算斐波那契数列第30位</button>
        <div>结果：{data}</div>
    </>
  );
};
