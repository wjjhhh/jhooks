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
      suspend: jest.fn().mockResolvedValue(undefined),
      resume: jest.fn().mockResolvedValue(undefined),
    }));
    Object.defineProperty(window, 'AudioContext', {
      value: mockAudioContext,
      writable: true,
    });
    global.AudioWorkletNode = jest.fn().mockImplementation(() => ({
      port: {
        onmessage: jest.fn(),
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

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useVolume());
    expect(result.current.stream).toBeUndefined();
    expect(result.current.error).toBeUndefined();
    expect(result.current.volume).toBe(0);
    expect(result.current.status).toBe('idle');
  });

  it('should start the stream successfully', (done) => {
    const mockGetUserMedia = jest
      .spyOn(navigator.mediaDevices, 'getUserMedia')
      .mockResolvedValue(new MediaStream());
    const { result } = renderHook(() => useVolume());
    setTimeout(() => {
      expect(mockGetUserMedia).toHaveBeenCalled();
      expect(result.current.stream).toBeDefined();
      expect(result.current.status).toBeDefined();
      expect(result.current.error).toBeUndefined();
      mockGetUserMedia.mockRestore();
      done();
    });
  });

  it('should handle errors when starting the stream', (done) => {
    const mockGetUserMedia = jest
      .spyOn(navigator.mediaDevices, 'getUserMedia')
      .mockRejectedValue(new Error('Permission denied'));
    const { result } = renderHook(() => useVolume());
    setTimeout(() => {
      expect(mockGetUserMedia).toHaveBeenCalled();
      expect(result.current.error).toBeDefined();
      expect(result.current.stream).toBeUndefined();
      mockGetUserMedia.mockRestore();
      done();
    });
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

  it('should handle suspended AudioContext', async () => {
    const { result } = renderHook(() => useVolume());
    Object.defineProperty(result.current.audioContext, 'state', {
      value: 'suspended',
      writable: true,
    });
    act(() => {
      result.current.audioContext.suspend();
    });
    expect(result.current.audioContext.state).toBe('suspended');

    jest.spyOn(result.current.audioContext, 'resume').mockResolvedValueOnce();

    await new Promise((resolve) => setTimeout(resolve));
    expect(result.current.audioContext.resume).toHaveBeenCalled();
  });

  it('should pass customProcessorPath parameter correctly', async () => {
    const customProcessorPath = 'path/to/custom/processor';
    const { result } = renderHook(() => useVolume({}, customProcessorPath));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(result.current.audioContext.audioWorklet.addModule).toHaveBeenCalledWith(
      customProcessorPath,
    );
  });
});
