import React from 'react';
import { act, renderHook, render, fireEvent } from '@testing-library/react';
import useSignalUpdate from '../index';
import useSignal from '../../useSignal';

describe('useSignalUpdate', () => {
  it('should be defined', () => {
    expect(useSignalUpdate).toBeDefined();
  });
  it('should render initial count', () => {
    const Component = () => {
      const [count, setCount] = useSignal(0);
      const [dep, setDep] = React.useState(99);
      useSignalUpdate(() => {
        setDep(count());
      });
      return (
        <>
          <div data-testid="signalId">{count()}</div>
          <div data-testid="depId">{dep}</div>
          <button data-testid="button" onClick={() => setCount(2)}></button>
        </>
      );
    };
    const { getByTestId } = render(<Component />);
    expect(getByTestId('depId').innerHTML).toBe('0');
    fireEvent.click(getByTestId('button'));
    expect(getByTestId('depId').innerHTML).toBe('2');
  });
});