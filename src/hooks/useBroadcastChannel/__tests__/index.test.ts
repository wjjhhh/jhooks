import { renderHook, act, waitFor } from '@testing-library/react';
import useBroadcastChannel from '..';

describe('useBroadcastChannel', () => {
  beforeEach(() => {
    // Mock the BroadcastChannel API
    (global.BroadcastChannel as jest.Mock) = jest.fn(() => ({
      addEventListener: jest.fn(),
      postMessage: jest.fn(),
      close: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new BroadcastChannel with the provided name', () => {
    const channelName = 'testChannel';
    renderHook(() => useBroadcastChannel(channelName));

    expect(BroadcastChannel).toHaveBeenCalledWith(channelName);
  });

  // it('should listen for messages and update the data state', async () => {
  //   const { result } = renderHook(() => useBroadcastChannel('testChannel'));
  //   act(() => {
  //     const testChannel = new BroadcastChannel('testChannel');
  //     testChannel.postMessage('Test message');
  //   });
  //   await waitFor(() => expect(result.current.data).toBe('Test message'));
  // });

  // it('should listen for message errors and update the error state', () => {
  //   const { result } = renderHook(() => useBroadcastChannel('testChannel'));

  //   const errorMessage = new Error('Message error');
  //   act(() => {
  //     result.current.channel.dispatchEvent(new MessageEvent('messageerror', { error: errorMessage }));
  //   });

  //   expect(result.current.error).toBe(errorMessage);
  // });

  it('should post a message using the post function', () => {
    const { result } = renderHook(() => useBroadcastChannel('testChannel'));

    const messageData = 'Hello, world!';
    act(() => {
      result.current.post(messageData);
    });

    expect(result.current.channel.postMessage).toHaveBeenCalledWith(messageData);
  });

  it('should close the channel and update the isClosed state', () => {
    const { result } = renderHook(() => useBroadcastChannel('testChannel'));

    act(() => {
      result.current.close();
    });

    expect(result.current.channel.close).toHaveBeenCalled();
    expect(result.current.isClosed).toBe(true);
  });
});
