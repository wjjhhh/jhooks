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
      <div>状态：{status}</div>
      <div>返回结果：{result}</div>
      <div>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
        <button onClick={() => post(value)}>2s后返回输入框值</button>
      </div>
      <div style={{ marginBlock: 10 }}>
        <button onClick={terminate} disabled={status === 'closed'}>
          停止worker
        </button>
      </div>
      <div>
        <button onClick={start} disabled={!['closed', 'error'].includes(status)}>
          重新开启worker
        </button>
      </div>
    </>
  );
};
