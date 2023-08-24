import React, { useState } from 'react';
import { useBase64 } from 'jhooks';

export default () => {
  const [text, setText] = useState('');
  const { base64, isSupported, promise } = useBase64(text);
  if (!isSupported) {
    return <>抱歉，您的浏览器不支持FileReader</>;
  }
  return (
    <>
      <div>
        源文本：
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div>
        转换后：
        <textarea value={base64} />
      </div>
    </>
  );
};
