import useStateFromProps from '..';
import { renderHook, act } from '@testing-library/react';

describe('useStateFromProps', () => {
  it('should return the initial value', () => {
    const initialProps = { value: 'initial' };

    const { result } = renderHook(() => useStateFromProps(initialProps));

    expect(result.current[0]).toEqual(initialProps);
  });

  it('should return the updated value', () => {
    const initialProps = { value: 'initial' };
    const newProps = { value: 'updated' };

    const { result, rerender } = renderHook(({ props }) => useStateFromProps(props), {
      initialProps: { props: initialProps },
    });

    expect(result.current[0]).toEqual(initialProps);

    rerender({ props: newProps });

    expect(result.current[0]).toEqual(newProps);
  });

  it('should update state using the setter function', () => {
    const initialProps = { value: 'initial' };

    const { result } = renderHook(() => useStateFromProps(initialProps));

    act(() => {
      result.current[1]({ value: 'updated' });
    });

    expect(result.current[0]).toEqual({ value: 'updated' });
  });

  it('should update state using the setter function with a function argument', () => {
    const initialProps = { value: 0 };

    const { result } = renderHook(() => useStateFromProps(initialProps));

    act(() => {
      result.current[1]((prevState) => ({ value: prevState.value + 1 }));
    });

    expect(result.current[0]).toEqual({ value: 1 });
  });
});
