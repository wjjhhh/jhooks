import { useRef, useState } from 'react'
import { useOverflowDection } from "@wjjhhh/jhooks";

export default () => {
    const ref = useRef(null)
    const [text, setText] = useState('')
    const [isOverflow] = useOverflowDection(ref, {
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
                    whiteSpace: 'nowrap',
                    background: 'yellowgreen'
                }}>
                {text}
            </div>
        </>

    )
}