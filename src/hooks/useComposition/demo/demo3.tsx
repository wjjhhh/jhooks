import { useComposition } from 'jhooks';
import { Select } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';

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
      fetch请求参数：{content}
      <div />
      <Select style={{ width: '50%' }} mode="multiple" {...props}>
        {createOpt().map((_) => (
          <Select.Option key={_.name}>{_.name}</Select.Option>
        ))}
      </Select>
    </>
  );
};
