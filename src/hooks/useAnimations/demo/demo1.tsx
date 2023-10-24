import { useRef } from 'react';
import { useAnimations } from 'jhooks';

export default () => {
  const ref = useRef(null);
  const { play, pause, cancel, reverse, finish, status } = useAnimations(
    ref,
    {
      transform: ['translateX(0)', 'translateX(550px)'],
    },
    {
      easing: 'cubic-bezier(.68,.08,.89,-0.05)',
      duration: 2000,
      fill: 'both',
      iterations: 1,
      immediate: false,
    },
  );

  return (
    <div>
      {status === 'running' ? (
        <button onClick={pause}>pause</button>
      ) : (
        <button onClick={play}>play</button>
      )}
      <button onClick={finish}>finish</button>
      <button onClick={cancel}>cancel</button>
      <button onClick={reverse}>reverse</button>
      <div>status: {status}</div>
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
