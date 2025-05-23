import { useEffect, useId, useLayoutEffect } from "react";
import { BasicTarget } from '../../types';
import { getTargetElement } from '../../utils';

type Target = BasicTarget | Window;

interface IUseScrollPositionOptions {
    /** localStorage or sessionStorage */
    level?: 'local' | 'session',
    target?: Target
    direction?: 'x' | 'y' | 'xy',
    /** define your key */
    cacheName?: string,
    cacheTime?: number
}

const isSupportedScrollend = 'onscrollend' in window;

const useSrollPosition = (options?: IUseScrollPositionOptions) => {
    const {
        level = 'session',
        target = window,
        direction = 'y',
        cacheName,
        cacheTime = 3600 * 24 * 1000
    } = options || {}

    const uniqueId = cacheName ?? useId()
    const storageKey = `scrollPosition-${uniqueId}`
    const storage = ({
        'session': sessionStorage,
        'local': localStorage
    })[level]

    const storageTimeKey = storageKey + '/time'
    const reset = () => {
        const ele = getTargetElement(target);
        storage.removeItem(storageKey)
        storage.removeItem(storageTimeKey)
    }

    useLayoutEffect(() => {
        const ele = getTargetElement(target);

        const _onScrollEnd = () => {
            const scrollPosition = ({
                'y': ele[target === window ? 'scrollY' : 'scrollTop'],
                'x': ele[target === window ? 'scrollX' : 'scrollLeft'],
                'xy': {
                    x: ele[target === window ? 'scrollX' : 'scrollLeft'],
                    y: ele[target === window ? 'scrollY' : 'scrollTop'],
                },
            })[direction]
            storage.setItem(storageKey, JSON.stringify(scrollPosition))
            storage.setItem(storageTimeKey, Date.now() + '')
        }
        const handleLoad = () => {
            const oldTime = Number(storage.getItem(storageTimeKey))
            if ((Date.now() - oldTime) > cacheTime) {
                storage.removeItem(storageKey)
                storage.removeItem(storageTimeKey)
            }
            const scrollPositionString = storage.getItem(storageKey)

            if (scrollPositionString) {
                if (scrollPositionString === 'undefined') {
                    storage.removeItem(storageKey)
                    return
                }
                const sp = JSON.parse(scrollPositionString)
                if (direction === 'x') {
                    ele.scrollTo(parseInt(sp, 10), 0)
                } else if (direction === 'y') {
                    ele.scrollTo(0, parseInt(sp, 10))
                } else {
                    ele.scrollTo(parseInt(sp.x, 10), parseInt(sp.y, 10))
                }
            }

        }
        handleLoad()
        if (isSupportedScrollend) {
            ele?.addEventListener('scrollend', _onScrollEnd);
            return () => {
                ele?.removeEventListener('scrollend', _onScrollEnd)
            }
        } else {
            ele?.addEventListener('scroll', _onScrollEnd)
            return () => {
                ele?.removeEventListener('scroll', _onScrollEnd)
            }
        }

    }, [])


    return {
        reset
    }
}

export default useSrollPosition