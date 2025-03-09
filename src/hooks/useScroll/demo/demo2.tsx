import React, { useRef, useEffect } from 'react';
import { useScroll } from '@wjjhhh/jhooks';


export default () => {
  const ref = useRef(null);
  const res = useScroll(ref, r => r.top);
  
  return (
    [
      <div key="0">top:{JSON.stringify(res)}</div>,
      <div
      key="1"
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
    ]
   
  );
};
