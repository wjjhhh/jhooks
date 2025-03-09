import { useCopy } from '@wjjhhh/jhooks';
import { message } from 'antd';
import React from 'react';
const mm = Date.now();

export default () => {
  const { ref, copy } = useCopy({
    trigger: 'dblclick',
    onSuccess: () => {
      message.info('简单复制成功');
    },
  });

  return (
    <>
      <div ref={ref}>
        <div>
          <div>
            <span>双击复制227890{mm}</span>
          </div>
        </div>
      </div>
      <button onClick={copy}>单击我也能复制上面内容</button>
      <br />
      <textarea
        style={{ height: 100 }}
        placeholder="我是空的，粘贴到这里验证吧"
      />
    </>
  );
};
