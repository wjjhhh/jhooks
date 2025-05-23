import { useRef, useState, useId } from 'react'
import { useScrollPosition } from "@wjjhhh/jhooks";


const Long = () => {
    const ref = useRef()

    const { reset } = useScrollPosition({
        target: ref,
        cacheName: 'jhooks-useScrollPosition-demo2',
       
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