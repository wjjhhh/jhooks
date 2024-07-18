import { useOnline } from 'jhooks';

export default () => {
  const isOnline = useOnline();
  return (
    <>
      <h1>Is Online: {isOnline ? 'Yes' : 'No'}</h1>
    </>
  );
};
