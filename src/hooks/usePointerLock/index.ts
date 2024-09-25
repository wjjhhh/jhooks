import { useState, useEffect, useRef, useCallback } from 'react';

type Position = {
  x: number;
  y: number;
};

const usePointerLock = ({
  onLock,
  onError,
  onExit,
  onMove,
}: {
  onLock?: () => void;
  onError?: () => void;
  onExit?: () => void;
  onMove?: (position: Position, event: MouseEvent) => void;
} = {}) => {
  const [isLocked, setIsLocked] = useState(false);
  const oldMove = useRef({ x: 0, y: 0 });
  const mousemove = (event: MouseEvent) => {
    oldMove.current = {
      x: oldMove.current.x + event.movementX,
      y: oldMove.current.y + event.movementY,
    };
    onMove?.(oldMove.current, event);
  };
  const handlePointerLockChange = () => {
    const _isLocked = document.pointerLockElement !== null;
    setIsLocked(_isLocked);

    if (_isLocked) {
      document.addEventListener(
        'mousemove',
        (event) => {
          oldMove.current = { x: event.clientX, y: event.clientY };
        },
        {
          once: true,
        },
      );
      document.addEventListener('mousemove', mousemove, false);
      onLock?.();
    } else {
      document.removeEventListener('mousemove', mousemove, false);
      onExit?.();
    }
  };

  const handlePointerLockError = useCallback(() => {
    console.error('Error attempting to lock pointer.');
    onError?.();
  }, []);

  const requestPointerLock = (element: HTMLElement) => {
    element.requestPointerLock();
  };

  const exitPointerLock = useCallback(() => {
    document.exitPointerLock();
    onExit?.();
  }, []);

  useEffect(() => {
    document.addEventListener('pointerlockchange', handlePointerLockChange, false);
    document.addEventListener('pointerlockerror', handlePointerLockError);

    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange, false);
      document.removeEventListener('pointerlockerror', handlePointerLockError);
    };
  }, []);

  return {
    isLocked,
    requestPointerLock,
    exitPointerLock,
  };
};

export default usePointerLock;
