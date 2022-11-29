import { fireEvent, render } from '@testing-library/react';
import React, { useState } from 'react';
import useWatch from '../index';

describe('useWatch', () => {
  it('should be defined', () => {
    expect(useWatch).toBeDefined();
  });

  it('should be watch', () => {
    let a = 0,
      b = 0;
    const Component = () => {
      const [value, setValue] = useState(a);
      useWatch(value, (newValue, oldValue) => {
        a = oldValue;
        b = newValue;
      });
      return <button data-testid="bt" onClick={() => setValue(value + 1)} />;
    };
    const com = render(<Component />);
    const bt = com.getByTestId('bt');
    fireEvent.click(bt);
    expect(a).toBe(0);
    expect(b).toBe(1);
    fireEvent.click(bt);
    expect(a).toBe(1);
    expect(b).toBe(2);
  });

  it('should be watch in deep', () => {
    let times = 0;

    const Component = () => {
      const [value, setValue] = useState({});
      useWatch(
        value,
        () => {
          times++;
        },
        { deep: true },
      );
      return (
        <>
          <button data-testid="bt" onClick={() => setValue({})} />
          <button data-testid="bt1" onClick={() => setValue({ jhooks: 'good!' })} />
        </>
      );
    };
    const com = render(<Component />);
    const bt = com.getByTestId('bt');
    const bt1 = com.getByTestId('bt1');
    fireEvent.click(bt);
    expect(times).toBe(0);
    fireEvent.click(bt);
    expect(times).toBe(0);
    fireEvent.click(bt1);
    expect(times).toBe(1);
    fireEvent.click(bt1);
    expect(times).toBe(1);
    fireEvent.click(bt);
    expect(times).toBe(2);
  });

  it('should stop or restart watch', () => {
    let a = 0,
      b = 0;
    const Component = () => {
      const [value, setValue] = useState(a);
      const { cancel, run, isWatching } = useWatch(value, (newValue, oldValue) => {
        a = oldValue;
        b = newValue;
      });

      return (
        <>
          <button data-testid="bt" onClick={() => setValue(value + 1)} />
          <button data-testid="cancel" onClick={cancel} />
          <button data-testid="run" onClick={run} />
          <div data-testid="isWatching">{isWatching === true && 'isWatching'}</div>
        </>
      );
    };
    const com = render(<Component />);
    const bt = com.getByTestId('bt');
    const cancel = com.getByTestId('cancel');
    const run = com.getByTestId('run');
    const isWatching = com.getByTestId('isWatching');
    fireEvent.click(bt);
    expect(a).toBe(0);
    expect(b).toBe(1);
    expect(isWatching.innerHTML).toBe('isWatching');
    fireEvent.click(cancel);
    fireEvent.click(bt);
    expect(a).toBe(0);
    expect(b).toBe(1);
    expect(isWatching.innerHTML).toBe('');
    fireEvent.click(run);
    expect(isWatching.innerHTML).toBe('isWatching');
    fireEvent.click(bt);
    expect(a).toBe(2);
    expect(b).toBe(3);
  });

  it('should watch multiple value', async () => {
    let a, b;
    const Component = () => {
      const [num1, setNum1] = useState(0);
      const [num2, setNum2] = useState(111);
      useWatch([num1, num2], (newValue, oldValue) => {
        a = oldValue;
        b = newValue;
      });

      return (
        <>
          <button data-testid="bt1" onClick={() => setNum1(num1 + 1)} />
          <button data-testid="bt2" onClick={() => setNum2(num2 + 1)} />
        </>
      );
    };
    const com = render(<Component />);
    const bt1 = com.getByTestId('bt1');
    const bt2 = com.getByTestId('bt2');
    fireEvent.click(bt1);
    expect(a).toEqual([0, 111]);
    expect(b).toEqual([1, 111]);
    fireEvent.click(bt2);
    expect(a).toEqual([1, 111]);
    expect(b).toEqual([1, 112]);
  });
});
