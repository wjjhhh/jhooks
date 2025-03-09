import { useState } from 'react';
import { useBroadcastChannel } from '@wjjhhh/jhooks';

const A = () => {
  const { post, data, close } = useBroadcastChannel('@wjjhhh/jhooks is good');
  const [value, setValue] = useState('');

  return (
    <>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={() => post(value)}>send</button>
      <div>
        <button onClick={close}>close send outside</button>
      </div>
      get data from B:{data}
    </>
  );
};

const B = () => {
  const { post, data } = useBroadcastChannel('@wjjhhh/jhooks is good');
  const [value, setValue] = useState('');
  return (
    <>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={() => post(value)}>send</button>
      get data from A:{data}
    </>
  );
};

export default () => {
  const { isSupported } = useBroadcastChannel('@wjjhhh/jhooks is good');

  if (!isSupported) {
    return <div>not supported BroadcastChannel API</div>;
  }
  return (
    <>
      <A />
      <div style={{ marginBottom: 20 }} />
      <B />
    </>
  );
};
