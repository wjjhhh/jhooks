import React, { useRef, useEffect } from 'react';
import { useScroll } from 'jhooks';


export default () => {
  const res = useScroll(document);
  
  return [
    <div key="0">{JSON.stringify(res)}</div>,
   
  ];
};
