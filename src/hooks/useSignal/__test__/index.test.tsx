import { act, renderHook } from '@testing-library/react';
import useSignal from '../index';

describe('useSignal', () => {
  // it('should return initial value', () => {
  //   const initialValue = 10;
  //   const { result } = renderHook(() => useSignal(initialValue));
  //   const [getter] = result.current;

  //   expect(getter()).toBe(initialValue);
  // });

//   it('should update value', () => {
//     const initialValue = 10;
//     const newValue = 20;
//     const { result } = renderHook(() => useSignal(initialValue));
//     const [, setter] = result.current;

//     act(() => {
//       setter(newValue);
//     });

//     const [getter] = result.current;
//     expect(getter()).toBe(newValue);
//   });

//   it('should update value using function', () => {
//     const initialValue = 10;
//     const increment = (prev: number) => prev + 1;
//     const { result } = renderHook(() => useSignal(initialValue));
//     const [, setter] = result.current;

//     act(() => {
//       setter(increment);
//     });

//     const [getter] = result.current;
//     expect(getter()).toBe(initialValue + 1);
//   });
});