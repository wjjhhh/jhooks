import { useState } from 'react';
import type { TargetType } from '@/utils/types';
import { getTargetElement } from '../../utils';
import useDeepEffect from '../useDeepEffect';

function useAnimation(
  target: TargetType,
  keyframes: PropertyIndexedKeyframes,
  options?: KeyframeAnimationOptions &
    Partial<{
      immediate: boolean;
      commitStyles: boolean;
    }>,
) {
  const [animate, setAnimate] = useState<Animation>();
  const [status, setStatus] = useState<'idle' | 'running' | 'paused' | 'finished'>('idle');
  const init = () => {
    const a = getTargetElement(target).animate(keyframes, options);

    a.onfinish = () => {
      setStatus('finished');
    };
    if (options?.commitStyles) {
      a.commitStyles();
    }
    return a;
  };
  const play = () => {
    if (options?.immediate === false) {
      setAnimate(init());
    } else {
      animate?.play();
    }
    setStatus('running');
  };
  const pause = () => {
    animate?.pause();
    setStatus('paused');
  };
  const cancel = () => {
    animate?.cancel();
    setStatus('idle');
  };
  const reverse = () => {
    if (animate?.currentTime !== null) {
      animate?.reverse();
    }
  };
  const finish = () => {
    animate?.finish();
    setStatus('finished');
  };
  useDeepEffect(() => {
    if (options?.immediate !== false) {
      setAnimate(init());
    }
  }, [target, keyframes, options]);
  return {
    play,
    pause,
    reverse,
    cancel,
    finish,
    animate,
    status,
    isSupported: window && HTMLElement && 'animate' in HTMLElement.prototype
  };
}

export default useAnimation;
