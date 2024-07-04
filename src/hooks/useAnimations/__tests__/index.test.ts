import { act, renderHook } from '@testing-library/react';
import useAnimations from '..';

describe('useAnimations', () => {
    it('should be defined', () => {
        expect(useAnimations).toBeDefined();
    })
    it('should not supported', () => {
        const hook = renderHook(() => {
            const div = document.createElement('div')
            return useAnimations(div, {})
        })
        expect(hook.result.current.isSupported).toBe(false)
    })
})