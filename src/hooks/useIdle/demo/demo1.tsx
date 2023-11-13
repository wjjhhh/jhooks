import { useIdle } from 'jhooks';

export default () => {
  const { isIdle, lastActive, reset } = useIdle(3 * 1000);

  return (
    <>
      <div>isIdle: {JSON.stringify(isIdle)}</div>
      <div>lastActive: {lastActive}</div>
    </>
  );
};
