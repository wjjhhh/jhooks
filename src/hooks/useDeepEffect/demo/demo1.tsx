import { useDeepEffect } from 'jhooks'
import { useEffect, useState, useRef } from 'react'

export default () => {
    const [_, setFlag] = useState({})
    const effectNum = useRef(0)
    const deepEffectNum = useRef(0)
    useEffect(() => {
        effectNum.current++
    }, [{}])
    useDeepEffect(() => {
        deepEffectNum.current++
    }, [{}])
    return (
        <div>
            <p>useEffect: {effectNum.current}</p>
            <p>useDeepEffect: {deepEffectNum.current}</p>
            <button onClick={() => setFlag({})}>render</button>
        </div>
    )

}