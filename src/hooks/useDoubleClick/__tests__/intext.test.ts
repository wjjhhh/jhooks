import useDoubleClick from '..';
import { renderHook, act } from '@testing-library/react';
import { preciseSetTimeout, getTargetElement } from '@/utils';
import type { TargetType } from '@/utils';

jest.mock('@/utils', () => ({
  preciseSetTimeout: jest.fn(),
  getTargetElement: jest.fn(),
}));

describe('useDoubleClick', () => {
  const doubleClick = jest.fn();
  const onClick = jest.fn();
  const options = { delay: 300, onClick };
  const target = {} as TargetType;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call onClick on single click', () => {
    const addEventListener = jest.fn();
    const removeEventListener = jest.fn();
    (getTargetElement as jest.Mock).mockReturnValue({
      addEventListener,
      removeEventListener,
    });

    renderHook(() => useDoubleClick(target, doubleClick, options));

    const clickEvent = new Event('click');
    const effect = addEventListener.mock.calls[0][1];

    act(() => {
      effect(clickEvent);
    });

    expect(preciseSetTimeout).toHaveBeenCalledWith(expect.any(Function), options.delay);
    const timeoutCallback = (preciseSetTimeout as jest.Mock).mock.calls[0][0];

    act(() => {
      timeoutCallback();
    });

    expect(onClick).toHaveBeenCalledWith(clickEvent);
    expect(doubleClick).not.toHaveBeenCalled();
  });

  it('should call doubleClick on double click', () => {
    const addEventListener = jest.fn();
    const removeEventListener = jest.fn();
    (getTargetElement as jest.Mock).mockReturnValue({
      addEventListener,
      removeEventListener,
    });

    renderHook(() => useDoubleClick(target, doubleClick, options));

    const clickEvent = new Event('click');
    const effect = addEventListener.mock.calls[0][1];

    act(() => {
      effect(clickEvent);
    });

    expect(preciseSetTimeout).toHaveBeenCalledWith(expect.any(Function), options.delay);
    const firstTimeoutCallback = (preciseSetTimeout as jest.Mock).mock.calls[0][0];

    act(() => {
      effect(clickEvent);
    });

    act(() => {
      firstTimeoutCallback();
    });

    expect(onClick).not.toHaveBeenCalled();
    expect(doubleClick).toHaveBeenCalled();
  });

  it('should clean up event listeners on unmount', () => {
    const addEventListener = jest.fn();
    const removeEventListener = jest.fn();
    (getTargetElement as jest.Mock).mockReturnValue({
      addEventListener,
      removeEventListener,
    });

    const { unmount } = renderHook(() => useDoubleClick(target, doubleClick, options));

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith('click', expect.any(Function));
  });
});
