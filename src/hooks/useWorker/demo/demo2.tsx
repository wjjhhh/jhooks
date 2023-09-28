import { useWorker } from 'jhooks';
import { useEffect, useState } from 'react';


function bigCal() {
  let timer: NodeJS.Timer
  self.onmessage = function (e) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      self.postMessage(new Date());
    }, 2000);
  };
}

export default () => {
  const [worker] = useWorker(bigCal);

  const [data, setData] = useState<string>();
  useEffect(() => {
    worker.onmessage = function (e: MessageEvent) {
      setData(e.data);
    };
  }, []);
  return (
    <>
      <button onClick={() => worker.postMessage(0)}>2s后返回时间</button>
      <div>结果：{data?.toString()}</div>
    </>
  );
};
