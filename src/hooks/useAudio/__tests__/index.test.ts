import { renderHook, act, waitFor } from '@testing-library/react';
import useAudio from '../index';

class MockAudio {
    src: string;
    volume: number;
    loop: boolean;
    muted: boolean;
    play: jest.Mock;
    pause: jest.Mock;
    private eventListeners: Record<string, ((e: Event) => void)[]>;
    constructor(src: string) {
        this.src = src;
        this.volume = 0.5;
        this.loop = false;
        this.muted = false;
        this.play = jest.fn().mockResolvedValue(true);
        this.pause = jest.fn();
        this.eventListeners = {};
    }
    addEventListener(eventType: string, callback: (e: Event) => void) {
        if (!this.eventListeners[eventType]) {
            this.eventListeners[eventType] = [];
        }
        this.eventListeners[eventType].push(callback);
    }
    removeEventListener(eventType: string, callback: (e: Event) => void) {
        if (this.eventListeners[eventType]) {
            this.eventListeners[eventType] = this.eventListeners[eventType].filter(
                listener => listener !== callback
            );
        }
    }
    triggerEvent(eventType: string, event?: Event) {
        if (this.eventListeners[eventType]) {
            const eventObj = event || new Event(eventType);
            this.eventListeners[eventType].forEach(callback => callback(eventObj));
        }
    }
}

beforeEach(() => {
    window.Audio = MockAudio as any;
    jest.spyOn(console, 'error').mockImplementation(() => { })
})

afterEach(() => {
    jest.restoreAllMocks();
})

describe('useAudio', () => {
    const getAudioInstance = (result: any): MockAudio => {
        return result.current.audioRef?.current as MockAudio;
    };
    it('should initialize correctly with default values', () => {
        const { result } = renderHook(() => useAudio({ src: 'test.mp3' }));
        expect(result.current.isPlaying).toBe(false);
        expect(result.current.volume).toBe(0.5);
        expect(result.current.isLoading).toBe(true);
    });

    it('should play audio when play is called', async () => {
        const { result } = renderHook(() => useAudio({ src: 'test.mp3' }));
        const audioInstance = getAudioInstance(result);

        // 触发 canplaythrough 事件以更新 isLoading 状态
        act(() => {
            audioInstance.triggerEvent('canplaythrough');
        });

        // 等待 isLoading 状态更新
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        // 调用 play 方法
        act(() => {
            result.current.play();
        });

        // 等待 isPlaying 状态更新
        await waitFor(() => {
            expect(result.current.isPlaying).toBe(true);
        });
    });

    it('should pause audio when pause is called', async () => {
        const { result } = renderHook(() => useAudio({ src: 'test.mp3', autoPlay: true }));
        const audioInstance = getAudioInstance(result);
        await waitFor(() => {
            audioInstance.triggerEvent('canplaythrough');
            expect(result.current.isLoading).toBe(false);
        });

        act(() => {
            result.current.pause();
        });
        expect(result.current.isPlaying).toBe(false);
    });

    it('should set volume correctly', async () => {
        const { result } = renderHook(() => useAudio({ src: 'test.mp3', initialVolume: 0.8 }));
        const audioInstance = getAudioInstance(result);

        // 触发 canplaythrough 事件以更新 isLoading 状态
        act(() => {
            audioInstance.triggerEvent('canplaythrough');
        });

        // 等待 isLoading 状态更新
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        // 设置音量
        act(() => {
            result.current.setVolume(0.3);
        });

        expect(result.current.volume).toBe(0.3);
    });

    it('should handle autoPlay correctly', async () => {
        const { result } = renderHook(() => useAudio({ src: 'test.mp3', autoPlay: true }));
        const audioInstance = getAudioInstance(result);
        await waitFor(() => {
            audioInstance.triggerEvent('canplaythrough');
            expect(result.current.isLoading).toBe(false);
        });
        expect(result.current.isPlaying).toBe(true);
    });

    it('should not play audio if src is not provided', () => {
        const { result } = renderHook(() => useAudio({}));
        act(() => {
            result.current.play();
        });
        expect(result.current.isPlaying).toBe(false);
    });

    it('should handle play errors gracefully', async () => {
        const error = new Error('Play error');
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        const { result } = renderHook(() => useAudio({ src: 'test.mp3' }));
        const audioInstance = getAudioInstance(result);

        // 触发 canplaythrough 事件以更新 isLoading 状态
        act(() => {
            audioInstance.triggerEvent('canplaythrough');
        });

        // 等待 isLoading 状态更新
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        // 直接修改实例的play方法来模拟错误
        audioInstance.play = jest.fn().mockRejectedValue(error);

        // 使用waitFor来等待异步操作完成
        await waitFor(() => {
            act(() => {
                result.current.play();
            });
            // 检查是否有错误被记录
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error playing audio:', error);
        });

        // 验证isPlaying状态仍然为false
        expect(result.current.isPlaying).toBe(false);
    });
})