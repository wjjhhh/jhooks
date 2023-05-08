import React, { useState } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import useLocalStorage from '../index';

describe('useLocalStorage', () => {
  it('should support some hooks remount and some hooks mount', async () => {
    const key = 'yhooks-test-useLocalStorage6';

    const ComponentA = () => {
      const [value] = useLocalStorage(key, 'good');
      return (
        <>
          <div data-testid="aValue">{value}</div>
        </>
      );
    };

    const ComponentB = () => {
      const [value, setValue] = useLocalStorage(key, 'good');
      return (
        <>
          <div data-testid="bValue">{value}</div>
          <button
            data-testid="bbtnId"
            onClick={() => {
              setValue(value === 'good' ? 'bad' : 'good');
            }}
          >
            buttonB
          </button>
        </>
      );
    };
    const App = () => {
      const [visible, setVisible] = useState(true);
      return (
        <>
          {visible && <ComponentA />}

          <ComponentB />
          <button data-testid="btnId" onClick={() => setVisible(!visible)}>
            click
          </button>
        </>
      );
    };
    const result = render(<App />);
    const toggleButton = result.getByTestId('btnId');
    const aValue = result.getByTestId('aValue');
    const bValue = result.getByTestId('aValue');
    const bbutton = result.getByTestId('bbtnId');
    expect(aValue.innerHTML).toBe('good');

    fireEvent.click(bbutton);
    expect(aValue.innerHTML).toBe('bad');
    expect(bValue.innerHTML).toBe('bad');

    // hide ComponentA
    fireEvent.click(toggleButton);
    expect(bValue.innerHTML).toBe('bad');

    fireEvent.click(bbutton);

    // reshow ComponentA
    fireEvent.click(toggleButton);

    waitFor(() => {
      expect(aValue.innerHTML).toBe('good');
      expect(bValue.innerHTML).toBe('good');
    });
  });
});
