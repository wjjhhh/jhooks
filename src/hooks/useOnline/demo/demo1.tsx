import { useOnline } from '@wjjhhh/jhooks';

export default () => {
  const isOnline = useOnline((_isOnline: boolean) => {
    console.log('online status change to:', _isOnline)
  });
  return (
    <>
      <h1>Is Online: {isOnline ? 'Yes' : 'No'}</h1>
    </>
  );
};
