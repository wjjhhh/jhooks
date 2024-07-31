import React from 'react';
import { useBatchExternal } from 'jhooks';

export default () => {
  const { status, load, unload } = useBatchExternal();
  return (
    <>
      <div>状态: {status}</div>

      <button
        onClick={() =>
          load([
            {
              url: '/useBatchExternal0.js',
              options: {
                type: 'module',
              },
            },
            {
              url: '/useBatchExternal1.js',
            },
          ])
        }
      >
        加载js
      </button>
      <button onClick={() => unload()}>卸载js</button>
    </>
  );
};
