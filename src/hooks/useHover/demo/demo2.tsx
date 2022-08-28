import { useHover } from 'jhooks';
import React, { useRef } from 'react';

export default () => {
  const ref = useRef(null);
  const { hovered } = useHover(ref);

  return (
    <div>
      <div ref={ref} style={{ background: '#000', color: '#fff' }}>
        在我上方hover
      </div>
      ----------------------------------------------------------------
      <div>显示它是否hovered: {hovered ? '是' : '否'}</div>
    </div>
  );
};
