import { useEffect, useState } from 'react'
import { BasicTarget } from '../../types';
import { getTargetElement } from '../../utils';
import { over, overArgs } from 'lodash-es';
import { doc } from 'prettier';

type OverflowDirection = 'horizontal' | 'vertical' | 'both'

export interface UseOverflowDectionOptions {
    direction?: OverflowDirection
    debounceTime?: number
    target: BasicTarget

}

function debounce(fn: Function, delay: number) {
    let timestamp = Date.now()
    return (...args: any[]) => {
        if (timestamp && (Date.now() - timestamp) >= delay) {
            timestamp = Date.now()
            fn(...args)
        }
    }
}

export default (options: UseOverflowDectionOptions) => {
    const {
        direction = 'horizontal',
        debounceTime = 200,
        target
    } = options
    const [isOverflow, setIsOverflow] = useState(false)
    useEffect(() => {
        const element = getTargetElement(target);

        if (element) {
            const check = debounce(() => {
                let overflow = false
                const range = document.createRange()
                range.selectNodeContents(element)
                const contentRect = range.getBoundingClientRect()
                const elementRect = element.getBoundingClientRect()
                console.log(contentRect)
                console.log(elementRect)
                if (direction === 'both' || direction === 'horizontal') {
                    overflow = contentRect.width > elementRect.width
                }
                if (!overflow && (direction === 'vertical' || direction === 'both')) {
                    overflow = contentRect.height > elementRect.height
                }
                setIsOverflow(overflow)
            }, debounceTime)

            window.addEventListener('resize', check)
            const observer = new MutationObserver(check)

            observer.observe(element, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true,
            })
            const returnBase = () => {
                window.removeEventListener('resize', check)
                observer.disconnect()
            }
            if (window.ResizeObserver) {
                const resizeObserver = new ResizeObserver(check)
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