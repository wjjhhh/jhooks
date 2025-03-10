import { useWatch } from '@wjjhhh/jhooks';
import React, { useState } from 'react';

export default () => {
  const [person, setPerson] = useState({});

  useWatch(
    person,
    (newValue, oldValue) => {
      console.log('新值', newValue);
      console.log('旧值', oldValue);
    },
    {
      deep: true,
    },
  );

  return (
    <>
      人员信息：{JSON.stringify(person)}
      <div>
        <button onClick={(e) => setPerson({ name: '小明' })}>填写小明的姓名</button>
        <button onClick={(e) => setPerson({ name: '小宏' })}>填写小宏的姓名</button>
      </div>
    </>
  );
};
