import { useState } from 'react';
import { useStateFromProps } from '@wjjhhh/jhooks';

const B = ({ data: outData }: { data: string[] }) => {
  const [data, setData] = useStateFromProps(outData);
  return (
    <div>
      B:
      <button onClick={() => setData([...data, 'b add self'])}>Add B todo</button>
      <ul>
        {data.map((todo: string, index: number) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};

const A = ({ data = [], setData }: { data: string[], setData: React.Dispatch<React.SetStateAction<string[]>> }) => {
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setData([...data, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div>
      <div>
        A:<button onClick={addTodo}>Add Todo</button>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        
      </div>
      <ul>
        {data.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};

export default () => {
  const [data, setData] = useState<string[]>([]);
  return (
    <div>
      <A data={data} setData={setData} />
      <B data={data} />
    </div>
  );
};
