import { useState, useEffect } from 'react';
import type { TargetType } from '@/utils/types';
import { getTargetElement, isPlainObject } from '../../utils';

function useAnimation(
  target: TargetType,
  keyframes: KeyframeEffect,
  options?: KeyframeAnimationOptions,
) {
  const [pending, setPending] = useState(false);
  const play = () => {
    getTargetElement(target).animate(keyframes, options);
  };
  const pause = () => {};
  const cancel = () => {};
  useEffect(() => {
    play();
  }, [target, keyframes, options]);
  return {
    pending,
    play,
    pause,
    cancel,
  };
}

export default useAnimation;
