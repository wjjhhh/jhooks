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
  const [_, { post, terminate, start, status }] = useWorker(bigCal, {
    onMessage: (e: MessageEvent) => {
      setResult(e.data);
    },
  });
  const [value, setValue] = useState<string>('');
  return (
    <>
      状态：{status}
      <div />
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <div />
      <button onClick={() => post(value)}>2s后返回输入框值</button>
      <div />
      <button onClick={terminate} disabled={status === 'closed'}>停止worker</button>
      <div />
      <button onClick={start} disabled={!['closed', 'error'].includes(status)}>
        重新开启worker
      </button>
      <div>返回结果：{result}</div>
    </>
  );
};
