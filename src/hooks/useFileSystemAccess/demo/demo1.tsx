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
        
        setSrc(URL.createObjectURL(file));
      })();
    }
  }, [file]);
  console.log('file', file)
  return (
    <>
      {isSupported ? (
        <button onClick={open}>打开图片</button>
      ) : (
        '抱歉，您的浏览器不支持 File System Access API'
      )}
      图片信息：
      <div>
        name: { file?.name}
      </div>
      <div>
        type: { file?.type}
      </div>
      <div>
        size: { file?.size}
      </div>
      <div>
        lastModifiedDate: { JSON.stringify(file?.lastModifiedDate)}
      </div>
      <img src={src} />
    </>
  );
};
