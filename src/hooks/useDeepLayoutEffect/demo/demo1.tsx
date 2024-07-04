import { useDeepLayoutEffect } from 'jhooks';
import { useLayoutEffect, useState, useRef } from 'react';

export default () => {
  const [_, setFlag] = useState({});
  const effectNum = useRef(0);
  const deepEffectNum = useRef(0);
  useLayoutEffect(() => {
    effectNum.current++;
  }, [{}]);
  useDeepLayoutEffect(() => {
    deepEffectNum.current++;
  }, [{}]);
  return (
    <div>
      <p>useEffect: {effectNum.current}</p>
      <p>useDeepLayoutEffect: {deepEffectNum.current}</p>
      <button onClick={() => setFlag({})}>render</button>
    </div>
  );
};
