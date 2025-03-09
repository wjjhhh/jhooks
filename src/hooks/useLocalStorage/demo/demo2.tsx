import React from 'react';
import { useLocalStorage } from '@wjjhhh/jhooks';

const key = 'jhooks_test_useLocalStorage1';

// 组件A
const A = () => {
  const [value = 0, setValue] = useLocalStorage(key);
  return (
    <div>
      我的值是：{value}，
      <button onClick={() => setValue(value + 1)}>点击+1</button>
    </div>
  );
};

// 组件B
const B = () => {
  const [value = 0] = useLocalStorage(key);
  return <div>我受上面影响，值也是：{value}</div>;
};

// 组件C
const C = () => {
  const [value] = useLocalStorage('pure');
  console.count('render C');
  return <div>我不受影响{value}</div>;
};

const Button = () => {
  const [value, , clear] = useLocalStorage(key);
  return <button onClick={clear}>点我清空localStorage</button>;
};

export default () => {
  return (
    <>
      <A />
      <B />
      <C />
      <Button />
    </>
  );
};
