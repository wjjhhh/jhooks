import { useCycleList } from 'jhooks';

export default () => {
  const { prev, next, data, index, push, pop, list } = useCycleList([
    'first',
    'second',
    'third',
    'four',
    'five',
  ]);

  return (
    <>
      成员：
      <div>
        {list.map((_) => (
          <span style={{ marginRight: 12 }} key={_}>{_}</span>
        ))}
      </div>
      <button onClick={prev}>prev</button>
      <button onClick={next}>next</button>
      <button onClick={() => push(Date.now())}>push</button>
      <button onClick={pop}>pop</button>
      <div>当前数据：{data}</div>
      <div>当前索引：{index}</div>
    </>
  );
};
