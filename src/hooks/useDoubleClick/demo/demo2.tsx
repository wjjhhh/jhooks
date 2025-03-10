import { useState, useRef } from 'react';
import { useDoubleClick } from '@wjjhhh/jhooks';

export default () => {
  const [clickNum, setClickNum] = useState(0);
  const [doubleClickNum, setDoubleClickNum] = useState(0);
  const buttonRef = useRef(null);
  useDoubleClick(
    buttonRef,
    () => {
      setDoubleClickNum((pre) => pre + 1);
    },
    {
      delay: 250,
      onClick: () => {
        setClickNum((pre) => pre + 1);
      },
    },
  );
  return (
    <>
      <button ref={buttonRef}>+</button>
      <div>click: {clickNum}</div>
      <div>double click: {doubleClickNum}</div>
    </>
  );
};
