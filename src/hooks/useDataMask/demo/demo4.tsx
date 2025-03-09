import { useDataMask } from '@wjjhhh/jhooks';
import React from 'react';

export default () => {
  const { data, visible, toggle } = useDataMask('45048119621273442X', {
    replacer: (value) =>
      value?.replace(/^(\d{1})\d+(\d|X|x{1})$/, `$1${'*'.repeat(16)}$2`),
  });
  return (
    <div>
      敏感id数据：<span>{data}</span>
      <button onClick={toggle}>{visible ? '隐藏' : '显示'}</button>
    </div>
  );
};
