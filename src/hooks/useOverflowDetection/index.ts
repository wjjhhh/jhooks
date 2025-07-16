import { useEffect, useState } from 'react'
import { BasicTarget } from '../../types';
import { getTargetElement } from '../../utils';
import useDebounceFn from '../useDebounceFn'

type OverflowDirection = 'horizontal' | 'vertical' | 'both'

export interface UseOverflowDectionOptions {
    direction?: OverflowDirection
    debounceTime?: number
}


export default (target: BasicTarget, options?: UseOverflowDectionOptions) => {
    const {
        direction = 'horizontal',
        debounceTime = 200,
    } = options || {}!
    const [isOverflow, setIsOverflow] = useState(false)

    const checkDebounce = useDebounceFn(() => {

        const element = getTargetElement(target);
        let overflow = false
        const range = document.createRange()
        range.selectNodeContents(element!)
        const contentRect = range.getBoundingClientRect()
        const elementRect = element!.getBoundingClientRect()
        if (direction === 'both' || direction === 'horizontal') {
            overflow = contentRect.width > elementRect.width
        }
        if (!overflow && (direction === 'vertical' || direction === 'both')) {
            overflow = contentRect.height > elementRect.height
        }
        console.log('overflow', overflow, 'direction', direction)
        setIsOverflow(overflow)
    }, debounceTime, [target, direction, debounceTime])

    useEffect(() => {
        const element = getTargetElement(target);

        if (element) {
            checkDebounce()
            window.addEventListener('resize', checkDebounce)
            const observer = new MutationObserver(checkDebounce)

            observer.observe(element, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true,
            })
            const returnBase = () => {
                window.removeEventListener('resize', checkDebounce)
                observer.disconnect()
            }
            if (window.ResizeObserver) {
                const resizeObserver = new ResizeObserver(checkDebounce)
                resizeObserver.observe(element)
                return () => {
                    resizeObserver.disconnect()
                    returnBase()
                }
            }
            return returnBase

        }

    }, [target, direction, debounceTime])

    return [
        isOverflow
    ]
}