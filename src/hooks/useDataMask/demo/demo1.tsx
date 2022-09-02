import { useDataMask } from 'jhooks';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState('')
  const { visible, toggle, data } = useDataMask(value);

  return (
    <>
      <div>请输入明文：<input value={value} onChange={e => setValue(e.target.value)} /></div>
      加密以上数据：<span>{data}</span>
      <button onClick={toggle}>{visible ? '隐藏' : '显示'}</button>
    </>
  );
};
