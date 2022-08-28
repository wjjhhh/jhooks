/**
 * title: 基础用法
 * desc: 只在依赖项更新时执行一次。
 */

import { useOnceUpdateLayoutEffect } from 'jhooks';
import React, { useLayoutEffect, useState } from 'react';

export default () => {
  const [toggle, setToggle] = useState(false);
  const [effectNum, setEffectNum] = useState(0);
  const [onceEffectNum, setOnceEffectNum] = useState(0);

  useLayoutEffect(() => {
    setEffectNum((n) => n + 1);
  }, [toggle]);

  useOnceUpdateLayoutEffect(() => {
    setOnceEffectNum((n) => n + 1);
  }, [toggle]);

  return (
    <>
      <div>effectNum is: {effectNum}</div>
      <div>我只更新一次：onceEffectNum is: {onceEffectNum}</div>
      <button onClick={() => setToggle(!toggle)}>
        toggle: {JSON.stringify(toggle)}
      </button>
    </>
  );
};
