import React from 'react';
import { useSleep } from 'jhooks';

async function fetchWithDelay() {
  const response = await fetch('https://mock.mengxuegu.com/mock/605c30690d58b864da03da46/example/getAllAdcode');
  await new Promise(resolve => setTimeout(resolve, 3000))
  return await response.json();
}

export default () => {
  const [data, setData] = React.useState({});
  const { destory, makeCancelable } = useSleep(() => {
    setData({
      status: 'reject',
    });
  });

  const loogOp = async () => {
    setData({})
    const response = await makeCancelable(fetchWithDelay());
    setData(response.data);
  };

  return (
    <>
      data: {JSON.stringify(data)}
      <br />
      <button onClick={loogOp}>发送请求</button>
      <br />
      <button onClick={destory}>暂停</button>
    </>
  );
};
