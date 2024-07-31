import { act, renderHook } from '@testing-library/react';
import useAnimations from '..';

let originalAnimate: Animatable['animate'];

describe('useAnimations unsupported', () => {
  it('should initialize with idle status and unsupported animation', () => {
    const { result } = renderHook(() => useAnimations(null, {}));
    expect(result.current.status).toBe('idle');
    expect(result.current.isSupported).toBe(false);
  });
});
describe('useAnimations', () => {
  it('should be defined', () => {
    expect(useAnimations).toBeDefined();
  });

  beforeAll(() => {
    originalAnimate = window.HTMLElement.prototype.animate;
    window.HTMLElement.prototype.animate = jest.fn();
  });
  afterAll(() => {
    window.HTMLElement.prototype.animate = originalAnimate;
  });
  it('should initialize with idle status and supported animation', () => {
    window.HTMLElement.prototype.animate = jest.fn();
    const { result } = renderHook(() => useAnimations(null));
    expect(result.current.status).toBe('idle');
    expect(result.current.isSupported).toBe(true);
  });

  it('should play the animation', () => {
    window.HTMLElement.prototype.animate = jest.fn();
    const { result } = renderHook(() => useAnimations(null));
    act(() => {
      result.current.play();
    });
    expect(result.current.status).toBe('running');
  });

  it('should pause the animation', () => {
    window.HTMLElement.prototype.animate = jest.fn();
    const { result } = renderHook(() => useAnimations(null));
    act(() => {
      result.current.pause();
    });
    expect(result.current.status).toBe('paused');
  });

  it('should cancel the animation', () => {
    window.HTMLElement.prototype.animate = jest.fn();
    const { result } = renderHook(() => useAnimations(null));
    act(() => {
      result.current.cancel();
    });
    expect(result.current.status).toBe('idle');
  });

  it('should reverse the animation', () => {
    window.HTMLElement.prototype.animate = jest.fn();
    const { result } = renderHook(() => useAnimations(null));
    act(() => {
      result.current.play();
      result.current.reverse();
    });
    expect(result.current.status).toBe('running');
  });

  it('should finish the animation', () => {
    window.HTMLElement.prototype.animate = jest.fn();
    const { result } = renderHook(() => useAnimations(null));
    act(() => {
      result.current.finish();
    });
    expect(result.current.status).toBe('finished');
  });
});
