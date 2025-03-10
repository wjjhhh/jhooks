import { useState } from 'react';
import { useCustomEvent } from '@wjjhhh/jhooks';

const A = () => {
  const { dispatch } = useCustomEvent('jhooks_useCustomEvent');
  return (
    <>
      <div>组件A：</div>
      <input type="number" onChange={(e) => dispatch(e.target.value)} />
    </>
  );
};

const onChange= () => {}

const B = () => {
  const [value, setValue] = useState();
  useCustomEvent('jhooks_useCustomEvent', {
    onChange: (e) => {
      setValue(e.detail);
    },
  });
  return (
    <>
      <div>组件B：</div>
      组件A传来的值:{value}
    </>
  );
};

const C = () => {
  const [value, setValue] = useState();
  useCustomEvent('jhooks_useCustomEvent', {
    onChange: (e) => {
      setValue(e.detail);
    },
  });
  return (
    <>
      <div>组件C：</div>
      组件A传来的值:{value}
    </>
  );
};

export default () => {
  return (
    <>
      <div>
        <A />
        <div>------</div>
        <B />
        <C />
      </div>
    </>
  );
};
