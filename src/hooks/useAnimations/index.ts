import { useState, useEffect, useRef } from 'react';
import type { TargetType } from '@/utils/types';
import { getTargetElement, isPlainObject } from '../../utils';

function useAnimation(
  target: TargetType,
  keyframes: KeyframeEffect,
  options?: KeyframeAnimationOptions,
) {
  const [pending, setPending] = useState(false);
  const animate = useRef<Animation>();
 

  const play = () => {
    animate.current?.play();
  };
  const pause = () => {
    animate.current?.pause();
  };
  const cancel = () => {
    animate.current?.cancel();
  };
  const reverse = () => {
    animate.current?.reverse();
  };
  useEffect(() => {
    animate.current = getTargetElement(target).animate(keyframes, options);
  }, [target, keyframes, options]);
  return {
    pending,
    play,
    pause,
    reverse,
    cancel,
  };
}

export default useAnimation;
