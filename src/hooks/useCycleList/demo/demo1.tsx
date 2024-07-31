import { useCycleList } from 'jhooks';

export default () => {
  const { prev, next, data, index, push, pop, shift, unshift, list } = useCycleList([
    'first',
    'second',
    'third',
    'four',
    'five',
  ]);
  console.log('list', list)
  return (
    <>
      成员：
      <div>
        {list.map((_) => (
          <span style={{ marginRight: 12 }} key={_}>
            {_}
          </span>
        ))}
      </div>
      <button onClick={prev}>prev</button>
      <button onClick={next}>next</button>
      <button onClick={() => push(Date.now())}>push</button>
      <button onClick={pop}>pop</button>
      <button onClick={shift}>shift</button>
      <button onClick={() => unshift(Date.now(), Date.now())}>unshift</button>
      <div>当前数据：{data}</div>
      <div>当前索引：{index}</div>
    </>
  );
};
