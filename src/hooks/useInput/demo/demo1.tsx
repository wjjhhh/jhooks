import { useInput } from 'jhooks';
import React, { useState } from 'react';

export default () => {
  const [content, setContent] = useState('');
  const [active, setActive ] = useState(true)
  const props = useInput({
    onChange: setContent,
    active,
  });

  return (
    <>
      <div>fetch所带参数：{content}</div>
      <input {...props} />
      <div></div>
      <button onClick={() => setActive(!active)}>{active ? '关闭' : '开启'}功能</button>
    </>
  );
};
