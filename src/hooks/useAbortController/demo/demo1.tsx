import React, { useState } from 'react';
import { useAbortController } from '@wjjhhh/jhooks';

const Com = () => {
  const abc = useAbortController({
    recovery: true,
  });
  const { signal } = abc;
  const [response, setResponse] = useState({});
  const myFetch = () => {
    setResponse({})
    fetch('https://mock.mengxuegu.com/mock/605c30690d58b864da03da46/example/getAllAdcode', {
      signal,
    })
      .then((r) => r.json())
      .then(setResponse)
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('Fetch was aborted');
        } else {
          console.log('Error', err);
        }
      });
  };

  return (
    <div style={{ border: '1px solid ', padding: 12 }}>
      <div>我是带网络请求的组件</div>
      <button onClick={myFetch}>fetch</button>
      <button onClick={() => abc.abort('我abort的')}>手动abort</button>
      <br />
      response:{JSON.stringify(response)}
    </div>
  );
};

export default () => {
  const [visible, setVisible] = useState(true);
  return (
    <>
      {visible && <Com />}
      <br />
      <button onClick={() => setVisible(!visible)}>{visible ? '隐藏' : '显示'}</button>
    </>
  );
};
