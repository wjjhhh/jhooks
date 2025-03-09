import { useHover } from '@wjjhhh/jhooks';
import React, { useId } from 'react';

export default () => {
  const id = useId()
  const { hovered } = useHover(() => document.getElementById(id));

  return (
    <div>
      <div id={id} style={{ background: '#000', color: '#fff' }}>
        在我上方hover
      </div>
      ----------------------------------------------------------------
      <div>显示它是否hovered: {hovered ? '是' : '否'}</div>
    </div>
  );
};
