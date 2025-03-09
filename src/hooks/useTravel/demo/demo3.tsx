/**
 * title: 基础用法
 * desc: 撤销跟重做操作，输入内容后，点击 back 和 forward。
 */
import { useTravel } from '@wjjhhh/jhooks';
import React from 'react';

export default () => {
  const {
    value,
    setValue,
    backLength,
    forwardLength,
    back,
    forward,
  } = useTravel<undefined, number>(undefined, 5);

  return (
    <div>
      <input value={value || ''} onChange={e => setValue(e.target.value)} />
      <button
        disabled={backLength <= 0}
        onClick={back}
        style={{ margin: '0 8px' }}
      >
        回退
      </button>
      <button disabled={forwardLength <= 0} onClick={forward}>
        前进
      </button>
    </div>
  );
};
