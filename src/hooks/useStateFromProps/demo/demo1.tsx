import { useState } from 'react';
import { useStateFromProps } from 'jhooks';

const Child = ({ num: parentNum }: { num: number }) => {
  const [num, setNum] = useStateFromProps(parentNum);
  console.count('child render');
  console.log('child state:', num);
  return (
    <div>
      <div>
        child state: {num}
        <button onClick={() => setNum(num + 1)}>add</button>
      </div>
    </div>
  );
};

export default () => {
  const [num, setNum] = useState(0);
  return (
    <div>
      <div>
        parent state: {num} <button onClick={() => setNum(num + 1)}>add</button>
      </div>

      <Child num={num} />
    </div>
  );
};
