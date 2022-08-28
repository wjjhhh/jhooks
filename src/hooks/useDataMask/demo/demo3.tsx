import { useDataMask } from 'jhooks';
import React from 'react';

export default () => {
  const { data, visible, toggle } = useDataMask('1234?#56+a78901', {
    mask: '😃',
  });
  return (
    <div>
      敏感id数据：<span>{data}</span>
      <button onClick={toggle}>{visible ? '隐藏' : '显示'}</button>
    </div>
  );
};
