import { useDataMask } from 'jhooks';
import React from 'react';

export default () => {
  const { data, visible, toggle } = useDataMask('1234?#56+a78901', {
    mask: 'ð',
  });
  return (
    <div>
      ææidæ°æ®ï¼<span>{data}</span>
      <button onClick={toggle}>{visible ? 'éè' : 'æ¾ç¤º'}</button>
    </div>
  );
};
