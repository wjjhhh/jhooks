import { useEffect, useRef } from 'react';
import { preciseSetTimeout, getTargetElement } from '@/utils';
import type { TargetType } from '@/utils';

type Options = {
    delay: number;
}

const useDoubleClick = (target: TargetType, doubleClick: Function, options: Options) => {
    const timerRef = useRef<(() => void) | null>(null)
    const hasClicked = useRef(false)
    const effect = () => {
        if (hasClicked.current) {
            doubleClick()
        }
        hasClicked.current = true
        timerRef.current = preciseSetTimeout(() => {
          
            hasClicked.current = false
        }, options.delay)
    }
    useEffect(() => {
        target.addEventListener('click', effect)
        return () => {
            target.removeEventListener('click', effect)
            timerRef.current?.()
        }
    }, [target, doubleClick, options])
}

export default useDoubleClick;