import { useWakeLock } from 'jhooks';
import { useState } from 'react';

export default () => {
  const [isChecked, setIsChecked] = useState(true);
  const { isSupported, lock, release } = useWakeLock({
    onRelease: () => {
      console.log('release successfully');
    },
    onLock: () => {
      console.log('lock successfully');
    },
  });
  if (!isSupported) {
    return 'Wake Lock API is not supported in this browser';
  }
  const onChange = () => {
    if (isChecked) {
      release();
    } else {
      lock();
    }
    setIsChecked(!isChecked);
  };
  return (
    <div>
      <label>
        <input type="checkbox" checked={isChecked} onChange={onChange} />
        Enable Wake Lock
      </label>
      <div></div>
    </div>
  );
};
