import { useRef } from 'react';
import { useAnimations } from 'jhooks';

export default () => {
  const ref = useRef(null);
  useAnimations(
    ref,
    {
      transform: ['translateX(0)', 'translateX(550px)'],
    },
    {
      easing: 'cubic-bezier(.68,.08,.89,-0.05)',
      duration: 2000,
      fill: 'both',
      iterations: Infinity,
    },
  );
  return (
    <div>
      <div
        ref={ref}
        style={{
          width: 200,
          height: 200,
          background: 'green',
        }}
      ></div>
    </div>
  );
};
