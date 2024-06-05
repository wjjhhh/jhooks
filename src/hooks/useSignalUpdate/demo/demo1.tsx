import { useSignal, useSignalUpdate } from 'jhooks';
import React from 'react';

export default () => {
  const [count1, setCount1, getValue] = useSignal(0);
  // const [info, setInfo] = useSignal({ name: 'Jack', age: 18 });
  const [array, setArray, ] = useSignal([1 ,2 ,3])
  console.count('render!');
  
  useSignalUpdate(() => {
    console.log('update: ',count1(), array())
  })
  return (
    <>
      {count1()}
      <button onClick={() => setCount1(getValue() + 1)}>+</button>
    </>
  );
};
