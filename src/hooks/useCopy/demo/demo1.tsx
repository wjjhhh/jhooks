import { useCopy } from '@wjjhhh/jhooks';
import { message } from 'antd';
import React from 'react';
const mm = Date.now();

export default () => {
  const ref = React.useRef(null);
  const { copy, paste, error } = useCopy(ref, {
    onSuccess: () => message.success('复制成功'),
    trigger: 'dblclick',
  });

  return (
    <>
      <div ref={ref}>
        <div id="gg">gg</div>
        <div>
          <div>
            <span>双击复制123456{mm}</span>
          </div>
        </div>
      </div>
      <button onClick={copy}>单击我也能复制上面内容</button>
      <br />
      <textarea
        style={{ height: 100 }}
        placeholder="我是空的，粘贴到这里验证吧"
      />
      <button
        onClick={() => {
          console.log('value', paste());
        }}
      >
        粘贴
      </button>
      {error}
    </>
  );
};
