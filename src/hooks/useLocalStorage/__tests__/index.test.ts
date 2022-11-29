import { act, renderHook } from '@testing-library/react';
import useLocalStorage from '../index';

describe('useLocalStorage', () => {
  it('should be defined', () => {
    expect(useLocalStorage).toBeDefined();
  });
  const setUp = <T>(key: string, initialValue?: T) => {
    return renderHook(() => {
      return useLocalStorage(key, initialValue);
    });
  };
  it('should work with initial value', () => {
    const key = 'jhooks-test-useLocalStorage0';
    const hook0 = setUp(key, 'initialValue');
    expect(hook0.result.current[0]).toEqual('initialValue');
    act(() => {
      hook0.result.current[1]('jhooks is good!');
    });
    expect(hook0.result.current[0]).toEqual('jhooks is good!');
  });
  it('should be reactive', () => {
    const key = 'jhooks-test-useLocalStorage1';
    const hook0 = setUp(key);
    const hook1 = setUp(key);
    act(() => {
      hook1.result.current[1]('jhooks is good!');
    });
    expect(hook1.result.current[0]).toEqual('jhooks is good!');
    expect(hook0.result.current[0]).toEqual('jhooks is good!');
  });
  it('should be equal localStorage', () => {
    const key = 'jhooks-test-useLocalStorage2';
    const hook = setUp(key);
    act(() => {
      hook.result.current[1]('jhooks is good!');
    });
    expect(localStorage.getItem(key)).toEqual(
      JSON.stringify('jhooks is good!'),
    );
  });
  it('should remove localStorage', () => {
    const key = 'jhooks-test-useLocalStorage3';
    const hook = setUp(key);
    act(() => {
      hook.result.current[1]('jhooks is good!');
      hook.result.current[2]();
    });
    expect(hook.result.current[0]).toBeNull();
    expect(localStorage.getItem(key)).toBeNull();
  });
  it('should support object', () => {
    const key = 'jhooks-test-useLocalStorage4';
    const hook = setUp(key, { name: 'jhooks'});
    expect(hook.result.current[0]).toEqual({ name: 'jhooks'})
  });
  it('should support null', () => {
    const key = 'jhooks-test-useLocalStorage5';
    const hook = setUp<boolean | null>(key, false);
    expect(hook.result.current[0]).toEqual(false);
    act(() => {
      hook.result.current[1](null);
    });
    expect(hook.result.current[0]).toEqual(null);
    const hook2 = setUp(key, false);
    expect(hook2.result.current[0]).toEqual(null);
  });
});
