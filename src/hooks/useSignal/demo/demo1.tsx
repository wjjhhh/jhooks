import { useSignal } from '@yingzi/yhooks';
import React, { useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useSignal(0);
  const [info, setInfo] = useSignal({ name: 'Jack', age: 18 });
  console.count('render!');
  const getSome = () => {
    console.log(count1())
  }
  return (
    <>
      <h2 onClick={getSome}>useState:</h2>
      <p>
        count: {count}
        <button onClick={() => setCount(count + 1)}>click + 1</button>
      </p>
      <h2>useSignal:</h2>
      <p>
        count1: {count1()}
        <button onClick={() => setCount1((p) => p + 1)}>click + 1</button>
        <button onClick={() => setCount1((p) => p + 2)}>click + 2</button>
      </p>
      <p>info.name: {info().name}</p>
      <p>info.age: {info().age}</p>
      <button onClick={() => setInfo((p) => ({ ...p, age: p.age + 1 }))}>
        age+ 1
      </button>
    </>
  );
};
