import { useHover } from 'jhooks';
import React from 'react';

export default () => {
  const { ref, hovered } = useHover();
  return <div ref={ref}>{hovered ? '鼠标悬停在元素上' : '鼠标在元素外'}</div>;
};
