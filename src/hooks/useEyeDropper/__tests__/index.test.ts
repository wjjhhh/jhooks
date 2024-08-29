import { renderHook, act, waitFor } from '@testing-library/react';
import useEyeDropper from '..';

declare global {
  interface Window {
    EyeDropper: any;
  }
}
beforeEach(() => {
  // 重置状态
  jest.clearAllMocks();
});

describe('useEyeDropper', () => {
  it('should initialize with default values ', () => {
    const { result } = renderHook(() => useEyeDropper());
    expect(result.current.color).toBeNull();
    expect(result.current.isSupported).toBe('EyeDropper' in window);
    expect(result.current.isLoading).toBe(false);
  });

  it('should set the color when EyeDropper is opened successfully', async () => {
    const mockOpen = jest.fn().mockResolvedValue({ sRGBHex: '#ffffff' });
    window.EyeDropper = jest.fn().mockImplementation(() => ({
      open: mockOpen,
    }));
    const { result } = renderHook(() => useEyeDropper());
    await act(async () => {
      result.current.openEyeDropper();
    });

    expect(mockOpen).toHaveBeenCalled();
    expect(result.current.color).toBe('#ffffff');
    expect(result.current.isLoading).toBe(false);
  });

  it('should log an error when EyeDropper is not supported', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    delete window.EyeDropper;

    const { result } = renderHook(() => useEyeDropper());
    act(() => {
      result.current.openEyeDropper();
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'EyeDropper API is not supported in your browser.',
    );
    expect(result.current.color).toBeNull();
    expect(result.current.isLoading).toBe(false);

    consoleErrorSpy.mockRestore();
  });

  it('should log an error when EyeDropper fails to open', async () => {
    const mockOpen = jest.fn().mockRejectedValue(new Error('Failed to open EyeDropper'));
    window.EyeDropper = jest.fn().mockImplementation(() => ({
      open: mockOpen,
    }));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useEyeDropper());
    await act(async () => {
      result.current.openEyeDropper();
    });

    expect(mockOpen).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'EyeDropper failed:',
      new Error('Failed to open EyeDropper'),
    );
    expect(result.current.color).toBeNull();

    consoleErrorSpy.mockRestore();
  });

  it('should reset the color', async () => {
    const mockOpen = jest.fn().mockResolvedValue({ sRGBHex: '#EEE' });
    window.EyeDropper = jest.fn().mockImplementation(() => ({
      open: mockOpen,
    }));
    const { result } = renderHook(() => useEyeDropper());
    await act(async () => {
      result.current.openEyeDropper();
    });
    act(() => {
      result.current.reset();
    });

    expect(result.current.color).toBeNull();
  });

});
