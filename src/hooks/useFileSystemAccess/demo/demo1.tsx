import React, { useEffect, useState } from 'react';
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
  const [src, setSrc] = useState('');
  useEffect(() => {
    if (file) {
      (async () => {
        const f = await file[0].getFile();

        setSrc(URL.createObjectURL(f));
      })();
    }
  }, [file]);
  return (
    <>
      {isSupported ? (
        <button onClick={open}>打开图片</button>
      ) : (
        '抱歉，您的浏览器不支持 File System Access API'
      )}
      <div>file.kind: {file?.[0]?.kind}</div>
      <div>file.name: {file?.[0]?.name}</div>
      <img src={src} />
    </>
  );
};
