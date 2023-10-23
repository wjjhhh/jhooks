import { useRef } from 'react';
import { useAnimations } from 'jhooks';

export default () => {
  const ref = useRef(null);
  const { play, pause, cancel, reverse, animate } = useAnimations(
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
      <button onClick={play}>play</button>
      <button onClick={pause}>pause</button>
      <button onClick={cancel}>cancel</button>
      <button onClick={reverse}>reverse</button>
      <button onClick={() => console.log('animate', animate)}>get ref</button>
      <div
        ref={ref}
        style={{
          width: 200,
          height: 200,
          background: 'green',
        }}
      />
    </div>
  );
};
