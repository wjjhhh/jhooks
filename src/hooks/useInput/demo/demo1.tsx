import { useInput } from 'jhooks';
import React, { useState } from 'react';

export default () => {
  const [content, setContent] = useState('');
  const props = useInput({
    onChange: setContent,
  });

  return (
    <>
      <div>fetch所带参数：{content}</div>
      <input {...props} />
    </>
  );
};
