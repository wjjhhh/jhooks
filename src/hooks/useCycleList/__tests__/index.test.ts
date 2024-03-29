import { renderHook, act } from '@testing-library/react';
import useCycleList from '..';

describe('useCycleList', () => {
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

  it('should push and pop', () => {
    const hook = renderHook(() => {
      return useCycleList(['Jack', 'Mike', 'Rose']);
    });

    act(() => {
      hook.result.current.push('Kate');
    });
    act(() => {
      hook.result.current.prev();
    });
    expect(hook.result.current.data).toBe('Kate');
    expect(hook.result.current.index).toBe(3);

    act(() => {
      hook.result.current.next();
    });
    expect(hook.result.current.data).toBe('Jack');

    act(() => {
      hook.result.current.pop();
    });
    act(() => {
      hook.result.current.prev();
    });
    expect(hook.result.current.data).toBe('Rose');
    expect(hook.result.current.index).toBe(2);
  });

  it('should shift and unshift', () => {
    const hook = renderHook(() => {
      return useCycleList(['A', 'B', 'C', 'D']);
    });
    act(() => {
      hook.result.current.shift();
    });
    expect(hook.result.current.list).not.toContain('A');
    expect(hook.result.current.data).toBe('B');
    act(() => {
      hook.result.current.prev();
    });
    expect(hook.result.current.data).toBe('D');
    expect(hook.result.current.index).toBe(2);
    act(() => {
      hook.result.current.unshift('j');
    });
    expect(hook.result.current.index).toBe(2);
    expect(hook.result.current.data).toBe('C');
    act(() => {
      hook.result.current.next();
    });
    act(() => {
      hook.result.current.next();
    });
    expect(hook.result.current.data).toBe('j');
  });

  it('should work though none member', () => {
    const hook = renderHook(() => {
      return useCycleList(['spring', 'summer']);
    });
    act(() => {
      hook.result.current.shift();
    });
    act(() => {
      hook.result.current.shift();
    });
    expect(hook.result.current.index).toBe(-1);
    expect(hook.result.current.data).toBeUndefined();
    expect(hook.result.current.list.length).toBe(0);
    act(() => {
      hook.result.current.next();
    });
    expect(hook.result.current.index).toBe(-1);
    act(() => {
      hook.result.current.prev();
    });
    expect(hook.result.current.index).toBe(-1);
    act(() => {
      hook.result.current.pop();
    });
    expect(hook.result.current.index).toBe(-1);
  });
});
