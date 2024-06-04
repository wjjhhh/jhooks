import React from 'react';
import { act, renderHook, render, fireEvent } from '@testing-library/react';
import useSignal from '../index';

function createComponent(id, initialValue) {
  const { result } = renderHook(() => useSignal(initialValue));
  const [getter] = result.current;
  return <div data-testid={id}>{getter()}</div>;
}

describe('useSignal', () => {
  it('should be defined', () => {
    expect(useSignal).toBeDefined();
  });
  it('should return initial value', () => {
    const initialValue = 10;
    const { result } = renderHook(() => useSignal(initialValue));
    const getValue = result.current[2];

    expect(getValue()).toBe(initialValue);
  });
  it('should return initial value in jsx', async () => {
    const id = 'signalId';
    const initialValue = 11;
    const Component = createComponent(id, initialValue);
    const com = render(Component);
    const result = com.getByTestId(id);
    expect(result.innerHTML).toBe(JSON.stringify(initialValue));
  });
  it('should update value', () => {
    const initialValue = 10;
    const newValue = 20;
    const { result } = renderHook(() => useSignal(initialValue));
    const [, setter, getValue] = result.current;

    act(() => {
      setter(newValue);
    });

    expect(getValue()).toBe(newValue);
  });
  it('should update value in jsx', () => {
    const id = 'signalId';
    const initialValue = 'hello';

    const Component = () => {
      const [getter, setter, getValue] = useSignal(initialValue);
      return (
        <div>
          <div data-testid={id}>{getter()}</div>
          <div data-testid="click0" onClick={() => setter('world')}></div>
          <div data-testid="click1" onClick={() => setter((prev) => 'hello ' + prev + '!')}></div>
        </div>
      );
    };
    const com = render(<Component />);

    const result = com.getByTestId(id);
    expect(result.innerHTML).toBe(initialValue);
    fireEvent.click(com.getByTestId('click0'));
    expect(result.innerHTML).toBe('world');
    fireEvent.click(com.getByTestId('click1'));
    expect(result.innerHTML).toBe('hello world!');
  });
  it('should update value using function', () => {
    const initialValue = 10;
    const increment = (prev: number) => prev + 1;
    const { result } = renderHook(() => useSignal(initialValue));
    const [, setter, getValue] = result.current;

    act(() => {
      setter(increment);
    });

    expect(getValue()).toBe(initialValue + 1);
  });
});
