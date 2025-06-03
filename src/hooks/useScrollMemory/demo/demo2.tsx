import { useRef, useState, useId } from 'react'
import { useScrollMemory } from "@wjjhhh/jhooks";


const Long = () => {
    const ref = useRef(null)

    const { reset } = useScrollMemory({
        target: ref,
        cacheName: 'jhooks-useScrollMemory-demo2',

    })
    return <div ref={ref} style={{ height: 400, background: '#fff', overflowY: 'auto' }}>
        <div style={{
            height: 3000
        }}
            onClick={reset}
        >
            long long content
        </div>
    </div>
}

export default () => {

    const [isMounted, setIsMounted] = useState(true)


    return (
        <>
            <button onClick={() => {
                setIsMounted(prev => !prev)
            }}>setIsMounted</button>
            {isMounted && <Long />
            }

        </>


    )
}