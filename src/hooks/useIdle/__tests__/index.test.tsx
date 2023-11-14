import { fireEvent, render, renderHook } from '@testing-library/react';
import useIdle from '..';
import React from 'react';
import { sleep } from '../../../utils';

describe('useIdle', () => {
  it('should be defined', () => {
    expect(useIdle).toBeDefined();
  });

  it('should update isIdle state when there is no user activity after timeout state', async () => {
    const { getByTestId } = render(<div data-testid="test-element">Hello World!</div>);
    const element = getByTestId('test-element');
    const hook = renderHook(() => {
      return useIdle(500);
    });
    fireEvent.mouseMove(element);
    await sleep(600);
    expect(hook.result.current.isIdle).toBe(true);
    fireEvent.mouseMove(element);
    expect(hook.result.current.isIdle).toBe(false);
  });
});
