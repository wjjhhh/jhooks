import { useCycleList } from 'jhooks';

export default () => {
  const { prev, next, data, index } = useCycleList(['first', 'second', 'third', 'four', 'five']);

  return (
    <>
      <button onClick={prev}>prev</button>
      <button onClick={next}>next</button>
      <div>当前数据：{data}</div>
      <div>当前索引：{index}</div>
    </>
  );
};
