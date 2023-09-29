import { useWorker } from 'jhooks';
import { useState } from 'react';

function bigCal() {
  let timer: NodeJS.Timer;
  self.onmessage = function (e) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      self.postMessage(e.data);
    }, 2000);
  };
}

export default () => {
  const [result, setResult] = useState();
  const [_, post, terminate] = useWorker(bigCal, {
    onMessage: (e: MessageEvent) => {
      setResult(e.data);
    },
  });
  const [value, setValue] = useState<string>('');

  return (
    <>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={() => post(value)}>2s后返回输入框值</button>
      <button onClick={terminate}>停止worker</button>
      <div>返回结果：{result}</div>
    </>
  );
};
