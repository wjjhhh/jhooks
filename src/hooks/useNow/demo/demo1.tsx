import { useNow } from '@wjjhhh/jhooks';

export default () => {
  const { now, pause, resume } = useNow();
  return (
    <div>
      {now}
      <div>
        <button onClick={pause}>暂停</button>
      </div>
      <div>
        <button onClick={resume}>继续</button>
      </div>
    </div>
  );
};
