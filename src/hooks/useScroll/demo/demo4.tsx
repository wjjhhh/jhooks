import React, { useRef, useEffect } from 'react';
import { useScroll } from '@wjjhhh/jhooks';


export default () => {
  const res = useScroll();
  
  return [
    <div key="0">{JSON.stringify(res)}</div>,
  ];
};
