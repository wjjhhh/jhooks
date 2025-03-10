/**
 * title: 基础用法
 * desc: 只在依赖项更新时执行一次。
 */

import { useUpdateEffect } from '@wjjhhh/jhooks';
import React, { useEffect, useState } from 'react';

export default () => {
  const [toggle, setToggle] = useState(false);
  const [effectNum, setEffectNum] = useState(0);
  const [onceEffectNum, setOnceEffectNum] = useState(0);

  useEffect(() => {
    setEffectNum((n) => n + 1);
  }, [toggle]);

  useUpdateEffect(
    () => {
      setOnceEffectNum((n) => n + 1);
    },
    [toggle],
    1,
  );

  return (
    <>
      <div>useEffect触发次数: {effectNum}</div>
      <div>useUpdateEffect触发次数: {onceEffectNum}</div>
      <button onClick={() => setToggle(!toggle)}>更新</button>
    </>
  );
};
