import React, { useEffect, useState } from 'react';
import { useFileSystemAccess } from 'jhooks';

export default () => {
  const { isSupported, open, file, save, setData } = useFileSystemAccess({
    types: [
      {
        description: 'Text file',
        accept: {'text/plain': ['.txt']},
      },
    ],
    multiple: false,
  });

  return (
    <>
     <textarea style={{width: 400, height: 400 }} onChange={e => setData(e.target.value)}></textarea>
      {isSupported ? (
        <button onClick={save}>保存文本</button>
      ) : (
        '抱歉，您的浏览器不支持 File System Access API'
      )}
      
    </>
  );
};
