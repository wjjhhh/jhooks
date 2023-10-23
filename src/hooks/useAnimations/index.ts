import { useState, useEffect, useRef } from 'react';
import type { TargetType } from '@/utils/types';
import { getTargetElement } from '../../utils';
import useDeepEffect from '../useDeepEffect';


function useAnimation(
  target: TargetType,
  keyframes: KeyframeEffect,
  options?: KeyframeAnimationOptions,
) {
  const [animate, setAnimate] = useState<Animation>();


  const play = () => {
    animate?.play();
  };
  const pause = () => {
    animate?.pause();
  };
  const cancel = () => {
    animate?.cancel();
  };
  const reverse = () => {
    animate?.reverse();
  };
  useDeepEffect(() => {
    setAnimate(getTargetElement(target).animate(keyframes, options));
  }, [target, keyframes, options]);
  
  return {
    play,
    pause,
    reverse,
    cancel,
    animate,
  };
}

export default useAnimation;
