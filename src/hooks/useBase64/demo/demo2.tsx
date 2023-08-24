import React, { useState } from 'react';
import { useBase64 } from 'jhooks';

export default () => {
  const [file, setFile] = useState<File>();
  const { base64, isSupported, promise } = useBase64(file);
  if (!isSupported) {
    return <>抱歉，您的浏览器不支持FileReader</>;
  }
 
  return (
    <>
      <div>
        源文本：
        <input type="file" onChange={(e) => setFile(e.target.files![0])} />
      </div>
      <div>
        转换后：
        <textarea value={base64} />
      </div>
      <img src={base64} />
    </>
  );
};
