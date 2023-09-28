import { useWorker } from 'jhooks';
import { useState } from 'react';

function bigCal() {
  let timer: NodeJS.Timer;
  self.onmessage = function (e) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      self.postMessage(new Date());
    }, 2000);
  };
}

export default () => {
  const [_, post] = useWorker(bigCal, {
    onMessage: (e: MessageEvent) => {
      setData(e.data);
    },
  });
  const [data, setData] = useState<string>();

  return (
    <>
      <button onClick={() => post(0)}>2s后返回时间</button>
      <div>结果：{data?.toString()}</div>
    </>
  );
};
