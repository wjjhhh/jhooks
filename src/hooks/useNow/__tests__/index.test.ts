import { renderHook } from '@testing-library/react'
import useNow from '..';
import { sleep } from '../../../utils'

let oldTime: number
beforeEach(() => {
    oldTime = +new Date()
})

describe('useNow', () => {
    it('should get now by default', () => {
        const hook = renderHook(() => useNow());
        expect(+new Date(hook.result.current.now)).toBeLessThanOrEqual(+new Date())
    })

    it('should update time by default interval', async () => {
        const hook = renderHook(() => useNow())
        await sleep(1000)
        expect(+new Date(hook.result.current.now) - +oldTime).toBeLessThan(1000)
        await sleep(1000)
        expect(+new Date(hook.result.current.now) - +oldTime).toBeLessThan(2000)
    })
  
    it('should update time by 50ms interval', async () => {
        const hook = renderHook(() => useNow(50))
        await sleep(50)
        expect(+new Date(hook.result.current.now) - oldTime).toBeLessThan(50)
        await sleep(50)
        expect(+new Date(hook.result.current.now) - oldTime).toBeLessThan(100)
    })

    it('should pause and resume time', async () => {
        const hook = renderHook(() => useNow())
        let t1 = hook.result.current.now
        hook.result.current.pause()
        await sleep(1000)
        expect(hook.result.current.now).toEqual(t1)
        hook.result.current.resume()
        await sleep(1000)
        expect(+new Date(hook.result.current.now) ).toBeGreaterThan(+new Date(t1))
    })
})