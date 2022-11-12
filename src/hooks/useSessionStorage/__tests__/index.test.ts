import { act, renderHook } from '@testing-library/react-hooks';
import useSessionStorage from '../index';

describe('useSessionStorage', () => {
  it('should be defined', () => {
    expect(useSessionStorage).toBeDefined();
  });
  it('should work with initial value', () => {
    const key = 'yhooks-test-useSessionStorage0';
    const hook0 = renderHook(() => useSessionStorage(key, 'initialValue'));
    expect(hook0.result.current[0]).toEqual('initialValue');
    act(() => {
      hook0.result.current[1]('yhooks is good!');
    });
    expect(hook0.result.current[0]).toEqual('yhooks is good!');
  });
  it('should be reactive', () => {
    const key = 'yhooks-test-useSessionStorage1';
    const hook0 = renderHook(() => useSessionStorage(key));
    const hook1 = renderHook(() => useSessionStorage(key));
    act(() => {
      hook1.result.current[1]('yhooks is good!');
    });
    expect(hook1.result.current[0]).toEqual('yhooks is good!');
    expect(hook0.result.current[0]).toEqual('yhooks is good!');
  });
  it('should be equal sessionStorage', () => {
    const key = 'yhooks-test-useSessionStorage2';
    const hook = renderHook(() => useSessionStorage(key));
    act(() => {
      hook.result.current[1]('yhooks is good!');
    });
    expect(sessionStorage.getItem(key)).toEqual(
      JSON.stringify('yhooks is good!'),
    );
  });
  it('should remove sessionStorage', () => {
    const key = 'yhooks-test-useSessionStorage3';
    const hook = renderHook(() => useSessionStorage(key));
    act(() => {
      hook.result.current[1]('yhooks is good!');
      hook.result.current[2]();
    });
    expect(hook.result.current[0]).toBeNull();
    expect(sessionStorage.getItem(key)).toBeNull();
  });
});