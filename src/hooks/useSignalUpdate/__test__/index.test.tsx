import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
  it('should run multiple useSignalUpdate', async () => {
    let times = 0;
    const Component = () => {
      const [num, setNum] = useSignal(0);
      useSignalUpdate(() => {
        times++;
      });
      return (
        <>
          {num()}
          <button data-testid="button" onClick={() => setNum(9)}></button>
        </>
      );
    };
    const { getByTestId } = render(<Component />);
    expect(times).toBe(1);
    fireEvent.click(getByTestId('button'));
    expect(times).toBe(2);
    fireEvent.click(getByTestId('button'));
    expect(times).toBe(3);
  });
});
