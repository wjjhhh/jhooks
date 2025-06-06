import { useRef, useState } from 'react'
import { useOverflowDection } from "@wjjhhh/jhooks";

export default () => {
    const ref = useRef(null)
    const [text, setText] = useState('今天星期几啊，哈哈哈，你是谁来？')
    const [isOverflow] = useOverflowDection(ref, {
        direction: 'both',
        debounceTime: 200
    })
    return (
        <>
            <input
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder='input something'
            />
            <div>
                ----------
            </div>
            
            isOverflow: {isOverflow ? 'true' : 'false'}
            <div
                ref={ref}
                style={{
                    width: 100,
                    height: 30,
                    overflow: 'hidden',
                    background: 'yellowgreen'
                }}>
                {text}
            </div>
        </>

    )
}