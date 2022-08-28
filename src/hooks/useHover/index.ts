import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { BasicTarget } from '../../types';
import { getTargetElement } from '../../utils';

interface Options {
  onEnter?: () => void;
  onLeave?: () => void;
  onChange?: (isHovering: boolean) => void;
}

export default function useHover(
  target?: BasicTarget | Options,
  options?: Options,
) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const isInsideRef =
    !target ||
    'onEnter' in target ||
    'onLeave' in target ||
    'onChange' in target;
  let _options = isInsideRef ? target : options;
  const getElement = () =>
    getTargetElement(isInsideRef ? innerRef : (target as BasicTarget));
  const onMouseEnter = useCallback(() => {
    setHovered(true);
    _options?.onEnter?.();
    _options?.onChange?.(true);
  }, []);
  const onMouseLeave = useCallback(() => {
    setHovered(false);
    _options?.onLeave?.();
    _options?.onChange?.(false);
  }, []);

  useLayoutEffect(() => {
    const targetElement = getElement();
    if (targetElement) {
      targetElement?.addEventListener('mouseenter', onMouseEnter);
      targetElement?.addEventListener('mouseleave', onMouseLeave);

      return () => {
        targetElement?.removeEventListener('mouseenter', onMouseEnter);
        targetElement?.removeEventListener('mouseleave', onMouseLeave);
      };
    }

    return undefined;
  }, []);
  if (isInsideRef) {
    return { ref: innerRef, hovered };
  }
  return { hovered };
}
