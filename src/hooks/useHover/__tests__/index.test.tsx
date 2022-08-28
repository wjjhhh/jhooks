import { fireEvent, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import useHover from '../index';

const hoverId = `hoverId_${Date.now()}`;

describe('useHover', () => {
  it('should be defined', () => {
    expect(useHover).toBeDefined();
  });

  const setUp_hook = (...args: any) => {
    return renderHook(() => {
      return useHover(...args);
    });
  };

  it('should work with self ref', () => {
    let enterTimes = 0;
    const Component = () => {
      const { ref, hovered } = useHover({
        onEnter: () => {
          enterTimes++;
        },
      });

      return (
        <div ref={ref}>
          useHover
          <span data-testid={hoverId}>{hovered ? 'hovering' : 'outing'}</span>
        </div>
      );
    };
    const result = render(<Component />);
    expect(result.getByTestId(hoverId).innerHTML).toBe('outing');
    fireEvent.mouseEnter(result.getByText('useHover'));

    expect(result.getByTestId(hoverId).innerHTML).toBe('hovering');
    fireEvent.mouseLeave(result.getByText('useHover'));
    expect(result.getByTestId(hoverId).innerHTML).toBe('outing');
    fireEvent.mouseEnter(result.getByText('useHover'));
    expect(enterTimes).toBe(2);
  });

  it('should work into dom', () => {
    const { getByText } = render(<span>useHover</span>);
    let changeTimes = 0;
    const { result } = setUp_hook(getByText('useHover'), {
      onChange: () => {
        changeTimes++;
      },
    });
    expect(result.current.hovered).toBe(false);
    fireEvent.mouseEnter(getByText('useHover'));
    expect(result.current.hovered).toBe(true);
    fireEvent.mouseLeave(getByText('useHover'));
    expect(result.current.hovered).toBe(false);
    expect(changeTimes).toBe(2);
  });

  it('should work into dom', () => {
    let divDom = document.createElement('div');
    const ref = { current: divDom };
    let enterTimes = 0,
      leaveTimes = 0,
      changeTimes = 0;
    const { result } = setUp_hook(ref, {
      onEnter: () => {
        enterTimes++;
      },
      onLeave: () => {
        leaveTimes++;
      },
      onChange: () => {
        changeTimes++;
      },
    });
    expect(result.current.hovered).toBe(false);
    fireEvent.mouseEnter(ref.current);
    expect(result.current.hovered).toBe(true);
    expect(enterTimes).toBe(1);
    fireEvent.mouseLeave(ref.current);
    expect(result.current.hovered).toBe(false);
    expect(leaveTimes).toBe(1);
    expect(changeTimes).toBe(2);
  });
});
