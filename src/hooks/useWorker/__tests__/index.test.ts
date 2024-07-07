import { renderHook, act } from '@testing-library/react';
import useWoker from '..';

class WorkerMock {
  onmessage: ((event: MessageEvent) => void) | null;
  onerror: ((event: ErrorEvent) => void) | null;

  constructor(stringUrl: string) {
    this.onmessage = null;
    this.onerror = null;
  }

  postMessage(message: any) {}

  terminate() {}
}
global.Worker = WorkerMock as any;
beforeAll(() => {
  global.URL.createObjectURL = jest.fn();
});

afterAll(() => {
  (global.URL.createObjectURL as jest.Mock).mockRestore();
});

describe('useWoker', () => {
  it('should create a worker and set status to open', () => {
    const { result } = renderHook(() => useWoker(() => {}));

    expect(result.current[0]).toBeInstanceOf(Worker);
    expect((result.current[1] as { status: string }).status).toBe('open');
  });

  it('should post a message to the worker', () => {
    const { result } = renderHook(() => useWoker(() => {}));
    const message = { text: 'Hello' };
    const postMessageSpy = jest.spyOn(result.current[0]!, 'postMessage');

    act(() => {
      result.current[1].post(message, []);
    });
    expect(postMessageSpy).toHaveBeenCalledWith(message, []);
  });

  it('should terminate the worker and set status to closed', () => {
    const { result } = renderHook(() => useWoker(() => {}));

    act(() => {
      result.current[1].terminate();
    });
    expect(result.current[1].status).toBe('closed');
  });
});
