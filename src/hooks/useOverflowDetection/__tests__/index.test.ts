import { renderHook, act } from '@testing-library/react';
import useOverflowDection from '../index';
import { BasicTarget } from '../../../types';
import { getTargetElement } from '../../../utils';

// 模拟 getTargetElement 函数
jest.mock('../../../utils', () => ({
    getTargetElement: jest.fn(),
}));

describe('useOverflowDetection', () => {
    let mockElement: HTMLElement;

    beforeEach(() => {
        // 创建一个模拟的 DOM 元素
        mockElement = document.createElement('div');
        (getTargetElement as jest.Mock).mockReturnValue(mockElement);

        // 模拟 createRange 方法
        const mockRange = {
            selectNodeContents: jest.fn(),
            getBoundingClientRect: jest.fn(() => ({ width: 200, height: 200 })),
        };
        document.createRange = jest.fn(() => mockRange as any);

        // 模拟 getBoundingClientRect 方法
        mockElement.getBoundingClientRect = jest.fn(() => ({
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            toJSON: () => { },
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    it('should initialize with correct default values', () => {
        const ref = { current: mockElement } as BasicTarget;
        const { result } = renderHook(() => useOverflowDection(ref));

        expect(result.current[0]).toBe(false);
    });

    it('should detect horizontal overflow correctly', () => {
        jest.useFakeTimers();

        const ref = { current: mockElement } as BasicTarget;
        const { result } = renderHook(() => useOverflowDection(ref, { direction: 'horizontal' }));

        // 模拟内容宽度大于元素宽度
        (mockElement.getBoundingClientRect as jest.Mock).mockImplementation(() => ({
            x: 0,
            y: 0,
            width: 50,
            height: 100,
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            toJSON: () => { },
        }));
        expect(result.current[0]).toBe(false);
        act(() => {
            window.dispatchEvent(new Event('resize'));

        });
        act(() => {
            jest.advanceTimersByTime(200); // 模拟防抖延时
        })

        expect(result.current[0]).toBe(true);
    });

    it('should detect vertical overflow correctly', () => {
        jest.useFakeTimers();
        const ref = { current: mockElement } as BasicTarget;
        const { result } = renderHook(() => useOverflowDection(ref, { direction: 'vertical' }));
        // 模拟内容高度大于元素高度
        (mockElement.getBoundingClientRect as jest.Mock).mockImplementation(() => ({
            width: 50,
            height: 198,
            toJSON: () => { },
        }));
        act(() => {
            // 模拟 resize 事件
            window.dispatchEvent(new Event('resize'));

        });
        act(() => {
            jest.advanceTimersByTime(200);
        })
        expect(result.current[0]).toBe(true);
    });

    it('should detect both horizontal and vertical overflow correctly', () => {
        jest.useFakeTimers();
        const ref = { current: mockElement } as BasicTarget;
        const { result } = renderHook(() => useOverflowDection(ref, { direction: 'both' }));
        (mockElement.getBoundingClientRect as jest.Mock).mockImplementation(() => ({
            width: 50,
            height: 198,
            toJSON: () => { },
        }));
        act(() => {
            // 模拟 resize 事件
            window.dispatchEvent(new Event('resize'));
        });
        act(() => {
            jest.advanceTimersByTime(200);
        })
        expect(result.current[0]).toBe(true);
    });

    it('should clean up event listeners on unmount', () => {
        const ref = { current: mockElement } as BasicTarget;
        const { unmount } = renderHook(() => useOverflowDection(ref));

        const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
        removeEventListenerSpy.mockRestore();
    });
});