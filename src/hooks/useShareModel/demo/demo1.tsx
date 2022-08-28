import { useShareModel } from 'jhooks';
import React, { useState, memo } from 'react';

const hook = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('')
  return { count, setCount, name, setName };
};


const useShare = useShareModel(hook);

const C1 = () => {
  const { count, setCount, name, setName } = useShare();

  console.count('c1')
  console.log('count', count)
  return (
    <>
      组件1 count: {count}
      <button onClick={() => setCount(count + 1)}>+</button>
      {/* <button onClick={() => setCount(count - 1)}>-</button>
      <input value={name} onChange={e => setName(e.target.value)} /> */}
    </>
  );
};


const C2 = () => {
  const { count, setCount, name } = useShare();
  console.count('c2')
  return (
    <>
      组件2 count: {count}
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <input value={name} onChange={e => setName(e.target.value)} />
    </>
  );
};
const C3 = () => {
  const { count } = useShare();
  console.count('c3')
  return <>组件3 count: {count}</>;
};
export default () => {
  return (
    <>
      <C1 />
      <div>----------</div>
      {/* <C2 />
      <div>----------</div>
      <C3 /> */}
    </>
  );
};
