import { useDataMask } from 'jhooks';
import React from 'react';

export default () => {
  const { visible, toggle, data } = useDataMask('1234?#56+a78901');

  return (
    <div>
      敏感id数据：<span>{data}</span>
      <button onClick={toggle}>{visible ? '隐藏' : '显示'}</button>
    </div>
  );
};
