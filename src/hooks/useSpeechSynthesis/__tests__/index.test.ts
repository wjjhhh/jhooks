import { renderHook, act } from '@testing-library/react';
import useSpeechSynthesis from '..';

describe('useSpeechSynthesis', () => {
  let originalSpeechSynthesisUtterance: typeof SpeechSynthesisUtterance;

  beforeAll(() => {
    // 保存原始的 SpeechSynthesisUtterance
    originalSpeechSynthesisUtterance = window.SpeechSynthesisUtterance;

    window.SpeechSynthesisUtterance = jest.fn().mockImplementation((text: string) => ({
      text,
      lang: '',
      voice: null,
      volume: 1,
      rate: 1,
      pitch: 1,
      onstart: jest.fn(),
      onend: jest.fn(),
      onerror: null,
      onpause: null,
      onresume: null,
      onmark: null,
      onboundary: null,
    }));
    window.speechSynthesis = {
      speak: jest.fn((utterance: SpeechSynthesisUtterance) => {
        if (utterance.onstart) {
          utterance.onstart(undefined as any);
        }
        // 延迟3秒触发onend事件
        setTimeout(() => {
          if (utterance.onend) {
            utterance.onend(undefined as any);
          }
        }, 100);
      }),
      cancel: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      getVoices: jest.fn().mockReturnValue([]),
      pending: false,
      speaking: false,
      paused: false,
      onvoiceschanged: null,
    } as unknown as SpeechSynthesis;
  });

  afterAll(() => {
    window.SpeechSynthesisUtterance = originalSpeechSynthesisUtterance;
  });
  it('should return initial values', () => {
    const { result } = renderHook(() => useSpeechSynthesis('Hello, world!'));

    expect(result.current.isSupported).toBe(true);
    expect(result.current.status).toBe('init');
    expect(result.current.error).toBeUndefined();
    expect(result.current.utterance).toBeDefined();
    expect(result.current.pause).toBeDefined();
    expect(result.current.resume).toBeDefined();
    expect(result.current.stop).toBeDefined();
    expect(result.current.speak).toBeDefined();
  });

  it('should update status to "ing" on speech start', () => {
    const { result } = renderHook(() => useSpeechSynthesis('Hello, world!'));
    const speakSpy = jest.spyOn(window.speechSynthesis, 'speak');
    act(() => {
      result.current.speak();
    });
    expect(speakSpy).toHaveBeenCalled();
    expect(result.current.status).toBe('ing');
  });

  it('should update status to "end" on speech end', (done) => {
    const { result } = renderHook(() => useSpeechSynthesis('H!'));

    act(() => {
      result.current.speak();
    });

    setTimeout(() => {
      act(() => {
        expect(result.current.status).toBe('end');
      });
      done();
    }, 200);
  });
});
