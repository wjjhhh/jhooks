import React, { useRef, useEffect } from 'react';
import { useScroll } from 'jhooks';


export default () => {
  const ref = useRef();
  const res = useScroll(ref);
  
  return [
    <div>{JSON.stringify(res)}</div>,
    <div
      style={{
        height: '160px',
        width: '160px',
        border: 'solid 1px #000',
        overflow: 'scroll',
        whiteSpace: 'nowrap',
        fontSize: '22px',
      }}
      ref={ref}
    >
      <div style={{ height: '1000px'}}>
        我是很长的内容,我是很长的内容,我是很长的内容,我是很长的内容,我是很长的内容，我是很长的内容
      </div>
     
    </div>
  ];
};
