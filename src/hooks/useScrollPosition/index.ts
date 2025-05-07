import { useEffect, useId } from "react";
import { BasicTarget } from '../../types';

type Target = BasicTarget | Window;

interface IUseScrollPositionOptions {
    level?: 'local' | 'session',
    target?: Target
    direction?: 'x' | 'y' | 'xy'
}

const useSrollPosition = (options?: IUseScrollPositionOptions) => {
    const {
        level = 'session',
        target = window,
        direction = 'y'
    } = options || {}
    const uniqueId = useId()
    const storageKey = `scrollPosition-${uniqueId}`
    const reset = () => { }
    useEffect(() => {
        const storage = ({
            'session': sessionStorage,
            'local': localStorage
        })[level]
        const handleBeforeUnload = () => {
            const scrollPosition = ({
                'y': window.scrollY,
                'x': window.scrollX,
                'xy': {
                    x: window.scrollX,
                    y: window.scrollY,
                }
            })[direction]
            storage.setItem(storageKey, JSON.stringify(scrollPosition))
        }
        const handleLoad = () => {
            const scrollPositionString = localStorage.getItem(storageKey)
            if (scrollPositionString) {
                const sp = JSON.parse(scrollPositionString)
                if (direction === 'x') {
                    window.scrollTo(parseInt(sp, 10), 0)
                } else if (direction === 'y') {
                    window.scrollTo(0, parseInt(sp, 10))
                } else {
                    window.scrollTo(parseInt(sp.x, 10), parseInt(sp.y, 10))
                }
            }

        }
        window.addEventListener('beforeunload', handleBeforeUnload)
        window.addEventListener('load', handleLoad)
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
            window.removeEventListener('load', handleLoad)
        }
    }, [level, target, direction])
    return {
        reset
    }
}

export default useSrollPosition