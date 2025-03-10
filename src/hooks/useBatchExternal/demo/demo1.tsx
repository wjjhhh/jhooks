import React from 'react';
import { useBatchExternal } from '@wjjhhh/jhooks';

export default () => {
  const { status, load, unload } = useBatchExternal(['/blue.css']);
  return (
    <>
      默认加载blue.css
      <div>状态: {status}</div>
      <button onClick={() => load(['/blue.css'])}>加载blue.css</button>
      <button onClick={() => unload('/blue.css')}>卸载blue.css</button>
      <button onClick={() => load([{ url: '/red.css' }])}>加载red.css</button>
      <button onClick={() => unload('/red.css')}>卸载blue.css</button>
      <button onClick={() => load(['/red.css', '/blue.css'])}>加载blue.css和red.css</button>
      <button onClick={() => unload()}>卸载全部</button>
    </>
  );
};
