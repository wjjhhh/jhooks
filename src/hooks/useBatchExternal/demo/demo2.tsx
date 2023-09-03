import React from 'react';
import { useBatchExternal } from 'jhooks';

export default () => {
  const { pending, load, unload } = useBatchExternal();
  return (
    <>
      <div>状态: {pending}</div>
      <button onClick={() => load(['/useBatchExternal0.js'])}>加载js</button>
      <button onClick={() => unload()}>卸载js</button>
    </>
  );
};
