import { useWatch } from 'jhooks';
import React, { useState } from 'react';

export default () => {
  const [content, setContent] = useState('');
  const [num, setNum] = useState(0)
  useWatch([content, num], (newValue, oldValue) => {
    console.log('新值', newValue)
    console.log('旧值', oldValue)
  });

  return (
    <>
      <input value={content} onChange={e  => setContent(e.target.value)} />
      <button onClick={() => setNum(num + 1)}>点击我增加1：{num}</button>
    </>
  );
};
