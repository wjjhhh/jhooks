import { renderHook } from '@testing-library/react';
import React from 'react';
import useScroll from '../index';

describe('useScroll', () => {
    it('document', () => {
        const hook = renderHook(() => useScroll(document))
        expect(hook.result.current).toEqual(undefined)
    })
})