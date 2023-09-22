import { useComposition } from 'jhooks';
import { Input } from 'antd';
import React, { useState } from 'react';

export default () => {
  const [content, setContent] = useState('');
  const props = useComposition({
    onChange: setContent,
  });

  return (
    <>
      <div>fetch所带参数：{content}</div>

      <div style={{ width: '200px' }}>
        <Input {...props} />
        ---
        <Input.TextArea {...props} />
      </div>
      {/* <MySelect /> */}
    </>
  );
};
