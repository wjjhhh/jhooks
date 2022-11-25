import { useLocalStorage } from 'jhooks';
import React from 'react';

const key = 'jhooks_test_useLocalStorage';

// 组件A
const A = () => {
  const [value] = useLocalStorage(key, { a: 11 });
  return <div>我是组件A，值是{JSON.stringify(value)}</div>;
};

// 组件B
const B = () => {
  const [value] = useLocalStorage(key, { a: 123 });
  return <div>我是组件B，值是{JSON.stringify(value)}</div>;
};

const ChangeButton = () => {
  const [, change] = useLocalStorage(key);
  return <button onClick={() => change({ a: Date.now() })}>点我修改</button>;
};

export default () => {
  return (
    <>
      <A />
      <B />
      <ChangeButton />
    </>
  );
};
