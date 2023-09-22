import { useComposition } from 'jhooks';
import { Select } from 'antd';
import React, { useState } from 'react';

const createOpt = () => {
  return Array.from({ length: 2000 }).map((_, i) => ({
    name: i + `${Math.random() < 0.5 ? 'a' : 'b'}`,
  }));
};

export default () => {
  const [content, setContent] = useState('');
  const props = useComposition({
    onSearch: setContent,
  });

  return (
    <>
      <Select style={{ width: '50%' }} mode="multiple" {...props}>
        {createOpt().map((_) => (
          <Select.Option key={_.name}>{_.name}</Select.Option>
        ))}
      </Select>
      fetch请求参数：{content}
    </>
  );
};
