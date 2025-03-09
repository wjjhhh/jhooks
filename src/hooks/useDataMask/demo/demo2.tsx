import { useDataMask } from '@wjjhhh/jhooks';
import React, { useState } from 'react';
import { sleep } from '../../../utils';

export default () => {
  const [loading, setLoading] = useState(false);
  const { data, visible, toggle } = useDataMask('*'.repeat(15), {
    request: async () => {
      setLoading(true);
      await sleep(800);
      setLoading(false);
      return '1234?#56+a78901';
    },
  });

  return (
    <>
      {loading && 'loading......'}
      <div>
        敏感id数据：<span>{data}</span>
        <button onClick={toggle}>{visible ? '隐藏' : '显示'}</button>
      </div>
    </>
  );
};
