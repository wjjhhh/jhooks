import { useSignal, useSignalUpdate } from 'jhooks';
import React from 'react';

export default () => {
  const [count1, setCount1, getValue] = useSignal(0);
  const [array, setArray] = useSignal([1, 2, 3]);
  const [show, setShow] = React.useState(true)
  console.count('render!');

  useSignalUpdate(() => {
    console.log('update: ', count1(), array());
  });
  return (
    <>
      <h3>change number</h3>
      {show && count1()}
      <button onClick={() => setCount1(getValue() + 1)}>+</button>
      <h3>change array</h3>
      {array().map((n) => (
        <span key={n}>{n}</span>
      ))}
      <button onClick={() => setArray([5, 6])}>array change</button>
      <button onClick={() => setShow(!show)}>sett</button>
    </>
  );
};
