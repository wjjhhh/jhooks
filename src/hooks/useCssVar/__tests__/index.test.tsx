import { render, act, renderHook } from '@testing-library/react';
import React, { useRef } from 'react';
import useCssVar from '../index';
describe('useHover', () => {
  it('should be defined', () => {
    expect(useCssVar).toBeDefined();
  });

  it('should work with ref', () => {
    const { result } = renderHook(() => {
      const ref = useRef(null);
      return useCssVar(ref, {
        '--color': 'red',
      });
    });

    expect(result.current.get()).toEqual({ '--color': 'red' });
  });
  it('should work change var', () => {
    const { getByText } = render(<button>useCssHover0</button>);

    const { result } = renderHook(() => {
      return useCssVar(getByText('useCssHover0'), {
        '--color': 'red',
      });
    });

    expect(result.current.get()).toEqual({ '--color': 'red' });
    const checkColor = () => {
      const vs = result.current.get();
      const color = vs?.['--color'];
      expect(color).toEqual(
        window
          .getComputedStyle(getByText('useCssHover0'))
          .getPropertyValue('--color'),
      );
    }
    act(() => {
      result.current.set({
        '--color': 'green',
      });
      checkColor(); 
      result.current.set('--color', 'yellow');
      checkColor();
    });
  });
  it('should clean var', () => {
    const { result } = renderHook(() => {
      const ref = useRef()
      return useCssVar(ref, {
        '--color': 'black'
      });
    });
    act(() => {
      result.current.set('--color', null);
      expect(result.current.get()).toEqual({
        '--color': null
      });
    });
  });
  it('should work simple var', () => {
    const { result } = renderHook(() => {
      const ref = useRef(null);
      return useCssVar(ref, {
        color: 'blue',
        background: 'green',
      });
    });

    expect(result.current.get()).toEqual({
      color: 'blue',
      background: 'green',
    });
  });
});
