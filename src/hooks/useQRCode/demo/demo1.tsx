import React, { useState } from 'react';
import { useQRCode } from 'jhooks';

export default () => {
  const [text, setText] = useState('jhooks');
  const dataUrl = useQRCode(text);

  return (
    <>
      <input onChange={(e) => setText(e.target.value)} value={text} />
      <div></div>
      <img src={dataUrl} />
    </>
  );
};
