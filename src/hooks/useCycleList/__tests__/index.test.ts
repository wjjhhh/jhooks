import { renderHook, act } from '@testing-library/react';
import useCycleList from '..';

describe('useBase64', () => {
  it('should be defined', () => {
    expect(useCycleList).toBeDefined();
  });

  it('should next', () => {
    const hook = renderHook(() => {
      return useCycleList(['Jack', 'Tom', 'Mike', 'Rose']);
    });
    expect(hook.result.current.index).toBe(0);
    expect(hook.result.current.data).toBe('Jack');

    act(() => {
      hook.result.current.next();
    });
    expect(hook.result.current.index).toBe(1);
    expect(hook.result.current.data).toBe('Tom');

    act(() => {
      hook.result.current.next();
      hook.result.current.next();
      hook.result.current.next();
    });
    expect(hook.result.current.index).toBe(0);
    expect(hook.result.current.data).toBe('Jack');
  });

  it('should prev', () => {
    const hook = renderHook(() => {
      return useCycleList(['white', 'red', 'yellow', 'blue']);
    });


    act(() => {
      hook.result.current.prev();
    });
    expect(hook.result.current.index).toBe(3);
    expect(hook.result.current.data).toBe('blue');

    act(() => {
      hook.result.current.prev();
    });
    expect(hook.result.current.index).toBe(2);
    expect(hook.result.current.data).toBe('yellow');
  });
});
