import { renderHook, act } from '@testing-library/react';
import usePointerLock from '..';

describe('usePointerLock', () => {
  let element: HTMLElement;
  beforeAll(() => {
    HTMLElement.prototype.requestPointerLock = jest.fn(function (this: HTMLElement) {
      Object.defineProperty(document, 'pointerLockElement', {
        configurable: true,
        enumerable: true,
        get: () => this,
      });
      document.dispatchEvent(new Event('pointerlockchange'));
    });
    document.exitPointerLock = jest.fn(() => {
      Object.defineProperty(document, 'pointerLockElement', {
        configurable: true,
        enumerable: true,
        get: () => null,
      });
      document.dispatchEvent(new Event('pointerlockchange'));
    });
  });
  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePointerLock());
    expect(result.current.isLocked).toBe(false);
  });

  it('should lock pointer and trigger onLock callback', () => {
    const onLock = jest.fn();
    const { result } = renderHook(() => usePointerLock({ onLock }));

    act(() => {
      result.current.requestPointerLock(element);
      document.dispatchEvent(new Event('pointerlockchange'));
    });

    expect(result.current.isLocked).toBe(true);
    expect(onLock).toHaveBeenCalled();
  });

  it('should handle pointer lock error and trigger onError callback', () => {
    const onError = jest.fn();
    const { result } = renderHook(() => usePointerLock({ onError }));

    act(() => {
      result.current.requestPointerLock(element);
    });

    document.dispatchEvent(new Event('pointerlockerror'));

    expect(onError).toHaveBeenCalled();
  });

  it('should exit pointer lock and trigger onExit callback', () => {
    const onExit = jest.fn();
    const { result } = renderHook(() => usePointerLock({ onExit }));

    act(() => {
      result.current.requestPointerLock(element);
      document.dispatchEvent(new Event('pointerlockchange'));
    });

    act(() => {
      result.current.exitPointerLock();
      document.dispatchEvent(new Event('pointerlockchange'));
    });

    expect(result.current.isLocked).toBe(false);
    expect(onExit).toHaveBeenCalled();
  });

  it('should handle mouse movement and trigger onMove callback', () => {
    const onMove = jest.fn();
    const { result } = renderHook(() => usePointerLock({ onMove }));

    act(() => {
      result.current.requestPointerLock(element);
      document.dispatchEvent(new Event('pointerlockchange'));
    });

    const mouseMoveEvent = new MouseEvent('mousemove', {
      movementX: 10,
      movementY: 15,
    });
    Object.defineProperty(mouseMoveEvent, 'movementX', { value: 10 });
    Object.defineProperty(mouseMoveEvent, 'movementY', { value: 15 });
    document.dispatchEvent(mouseMoveEvent);

    expect(onMove).toHaveBeenCalledWith({ x: 10, y: 15 }, mouseMoveEvent);
  });
});
