import { useHover } from 'jhooks';
import React from 'react';

const randomId = `hover_dom_${Date.now()}`;
export default () => {
  const { hovered } = useHover(() => document.getElementById(randomId));

  return (
    <div>
      <div id={randomId} style={{ background: '#000', color: '#fff' }}>
        在我上方hover
      </div>
      ----------------------------------------------------------------
      <div>显示它是否hovered: {hovered ? '是' : '否'}</div>
    </div>
  );
};
