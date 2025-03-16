import { fireEvent, render, renderHook, act } from '@testing-library/react';
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
  it('should reset timeout state', async () => {
    const { getByTestId } = render(<div data-testid="test-element">Hello World!</div>);
    const element = getByTestId('test-element');
    const hook = renderHook(() => {
      return useIdle(500);
    });
    fireEvent.touchStart(element);
    await sleep(600);
    hook.result.current.reset();
    expect(hook.result.current.isIdle).toBe(true);
    fireEvent.keyDown(element);
    expect(hook.result.current.isIdle).toBe(false);
    await sleep(600);
    expect(hook.result.current.isIdle).toBe(true);
  });
  it('should update lastActive', async () => {
    const { getByTestId } = render(<div data-testid="test-element">Hello World!</div>);
    const element = getByTestId('test-element');
    const hook = renderHook(() => {
      return useIdle(500);
    });
    const lastActive0 = hook.result.current.lastActive;
    act(() => {
      fireEvent.mouseDown(element);
    });
    const lastActive1 = hook.result.current.lastActive;
    expect(lastActive1).not.toBe(lastActive0);
    jest.useFakeTimers();
    act(() => {
      jest.advanceTimersByTime(600);
    });
    expect(lastActive1).toBe(hook.result.current.lastActive);
    jest.useRealTimers();
  });
});
