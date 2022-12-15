import React, { useEffect, useState } from 'react';
import { useFileSystemAccess } from 'jhooks';

export default () => {
  const { isSupported, open, file, create, save, saveAs, setData, data } = useFileSystemAccess({
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
    {
      data &&  <textarea style={{width: 400, height: 400 }} onChange={e => setData(e.target.value)} value={data}></textarea>
    }
    
      {isSupported ? (
        <>
            <button onClick={open}>打开文本</button>
            <button onClick={create}>新建文本</button>
            <button onClick={save} disabled={!file}>文本保存</button>
            <button onClick={saveAs} disabled={!file}>文本另存为</button>
        </>
       
      ) : (
        '抱歉，您的浏览器不支持 File System Access API'
      )}
      
    </>
  );
};
