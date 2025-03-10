import { useComposition } from '@wjjhhh/jhooks';
import { Input } from 'antd';
import { useState, useRef } from 'react';

export default () => {
  const [content, setContent] = useState('');
  const inputRef = useRef(null)
  const props = useComposition(inputRef, {
    onChange: setContent,
  });
  return (
    <>
      <div>fetch所带参数：{content}</div>

      <div style={{ width: '200px' }}>
        Input:
        <Input {...props} />
        <div />
        TextArea:
        <Input.TextArea {...props} />
      </div>
    </>
  );
};
