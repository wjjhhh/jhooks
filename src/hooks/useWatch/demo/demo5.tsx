import { useWatch } from 'jhooks';
import React, { useState } from 'react';

export default () => {
  const [content, setContent] = useState('');
  useWatch(content, (newValue, oldValue) => {
    console.log('新值', newValue)
    console.log('旧值', oldValue)
  }, {
    once: true
  });

  return (
    <>
      <input value={content} onChange={e  => setContent(e.target.value)} />

    </>
  );
};
