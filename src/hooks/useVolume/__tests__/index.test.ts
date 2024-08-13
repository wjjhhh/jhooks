import { renderHook, act, waitFor } from '@testing-library/react';
import useVolume from '..';

describe('useVolume', () => {
  beforeEach(() => {
    // Mock the necessary browser APIs
    global.MediaStream = jest.fn().mockImplementation(() => ({}));
    Object.defineProperty(navigator, 'mediaDevices', {
      value: {
        getUserMedia: jest.fn().mockImplementation(() => Promise.resolve(new MediaStream())),
      },
      writable: true,
    });
    // Mock the AudioContext constructor and its methods
    const mockAudioContext = jest.fn().mockImplementation(() => ({
      state: 'running',
      audioWorklet: {
        addModule: jest.fn().mockResolvedValue(undefined),
      },
      createMediaStreamSource: jest.fn().mockReturnValue({
        connect: jest.fn().mockReturnValue({
          connect: jest.fn(),
        }),
      }),
      createScriptProcessor: jest.fn(),
      destination: {},
      close: jest.fn().mockResolvedValue(undefined),
    }));
    Object.defineProperty(window, 'AudioContext', {
      value: mockAudioContext,
      writable: true,
    });
    global.AudioWorkletNode = jest.fn().mockImplementation(() => ({
      port: {
        onmessage: null,
        postMessage: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
      connect: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should start the stream and get the volume', async () => {
    const { result } = renderHook(() => useVolume());
    expect(result.current.status).toBe('idle');
    expect(result.current.stream).toBeUndefined();
    expect(result.current.error).toBeUndefined();
    expect(result.current.volume).toBe(0);
    expect(result.current.error).toBeUndefined();
  });

  it('should close the stream and start again', async () => {
    const { result } = renderHook(() => useVolume());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      await result.current.closeStream();
    });
    expect(result.current.status).toBe('closed');
    expect(result.current.stream).toBeUndefined();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      result.current.startStream();
    });

    expect(result.current.stream).toBeDefined();
    expect(result.current.status).toBe('running');
  });
});
