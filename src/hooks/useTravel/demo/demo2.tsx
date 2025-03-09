/**
 * title: 间接记录复杂对象类型
 * desc: 撤销跟重做操作，输入内容后，点击 back 和 forward。甚至可以在第二个参数传true来覆盖记录(不进入历史)。
 */
import { useTravel } from '@wjjhhh/jhooks';
import React, { useState } from 'react';

export default () => {
  const {
    value,
    setValue,
    backLength,
    forwardLength,
    back,
    forward,
  } = useTravel([]);
  const [inputValue, setInputValue] = useState<{ name?: string; age?: number }>(
    {},
  );
  
  const onAdd = (isCover?: boolean) => {
    setValue([...value, inputValue], isCover);
  };
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'name' | 'age',
  ) => {
    setInputValue({
      ...inputValue,
      [type]: e.target?.value,
    });
  };

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        姓名：
        <input value={inputValue.name} onChange={e => onChange(e, 'name')} />
        年龄：
        <input
          value={inputValue.age}
          type="number"
          onChange={e => onChange(e, 'age')}
        />
      </div>
      <button type="button" onClick={() => onAdd()}>
        增加列表记录
      </button>
      <button type="button" onClick={() => onAdd(true)}>
        增加列表记录（覆盖上一步）
      </button>
  
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
    
      <h1>history list</h1>
      <ul>
        {value.map((it: object, i: number) => (
          <li key={i}>{JSON.stringify(it)}</li>
        ))}
      </ul>
    </>
  );
};
