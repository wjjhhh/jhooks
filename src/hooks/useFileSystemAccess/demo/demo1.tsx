import React from 'react';
import { useFileSystemAccess } from 'jhooks';

export default () => {
  const { isSupported, open, file } = useFileSystemAccess({
    types: [
      {
        description: 'Images',
        accept: {
          'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
        },
      },
    ],
    multiple: false,
  });
  console.log('file', file?.[0]?.kind);
  return (
    <>
      {isSupported ? (
        <button onClick={open}>打开图片</button>
      ) : (
        '抱歉，您的浏览器不支持 File System Access API'
      )}
      <div>file.kind: {file?.[0]?.kind}</div>
      <div>file.name: {file?.[0]?.name}</div>
    </>
  );
};
