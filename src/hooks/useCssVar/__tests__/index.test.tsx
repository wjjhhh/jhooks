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

    act(() => {
      result.current.set({
        '--color': 'green',
      });
      const vs = result.current.get();
      const color = vs?.['--color'];
      expect(color).toEqual(
        window
          .getComputedStyle(getByText('useCssHover0'))
          .getPropertyValue('--color'),
      );
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
