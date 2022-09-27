import { useWatch } from 'jhooks';
import React, { useState } from 'react';

export default () => {
  const [content, setContent] = useState('');
  const { cancel, run, isWatching } = useWatch(content, (newValue, oldValue) => {
    console.log('新值', newValue);
    console.log('旧值', oldValue);
  });

  return (
    <>
      <input value={content} onChange={(e) => setContent(e.target.value)} />
      {isWatching ? (
        <button onClick={cancel}>停止watch</button>
      ) : (
        <button onClick={run}>重新开启watch</button>
      )}
    </>
  );
};
