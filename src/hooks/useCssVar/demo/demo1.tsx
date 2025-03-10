import { useCssVar } from '@wjjhhh/jhooks';
import React, { useRef } from 'react';
import './demo.less';

export default () => {
  const ref = useRef(null);
  useCssVar(ref, {
    '--color': 'yellow',
    '--background-color': '#000',
  });
  return (
    <div ref={ref} className="useCssVar">
      我是useCssVar的div
    </div>
  );
};
