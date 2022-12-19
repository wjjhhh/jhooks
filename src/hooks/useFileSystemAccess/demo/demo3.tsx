import React, { useEffect, useState } from 'react';
import { useFileSystemAccess } from 'jhooks';

export default () => {
  const { isSupported, readDirectory } = useFileSystemAccess();
  const [dir, setDir] = useState([])
  const callback = async (dirHandle) => {
     const _dir = []
     for await (const entry of dirHandle.values()) {
        _dir.push(entry)
      }
      setDir(_dir)
  }
  return (
    <>

      {isSupported ? (
        <>
          <button onClick={() => readDirectory(callback)}>打开目录</button>
          
        </>
      ) : (
        '抱歉，您的浏览器不支持 File System Access API'
      )}
      <div>文件夹列表</div>
      {
        dir.map(_ => (
          <div key={_.name}>kind: {_.kind}, name: {_.name}</div>
        ))
      }
    </>
  );
};
