import React from 'react';
import { useBatchExternal } from 'jhooks';

export default () => {
  const { pending, load, unload } = useBatchExternal();
  return (
    <>
      <div>状态: {pending}</div>
      <button onClick={() => load([{
        url: '/useBatchExternal0.js',
        options: {
          type: 'module'
        }
      }])}>加载js</button>
      <button onClick={() => unload()}>卸载js</button>
    </>
  );
};
