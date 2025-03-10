import { useState } from 'react'
import { useBroadcastChannel } from '@wjjhhh/jhooks'

const A = () => {
    const { post, data } = useBroadcastChannel('@wjjhhh/jhooks channel')
    const [value, setValue] = useState('')
 
    return (
        <>
            <input value={value} onChange={e => setValue(e.target.value)} />
            <button onClick={() => post(value)}>send</button>
            get data from B:{data}
        </>
    )
}


const B = () => {
    const { post, data } = useBroadcastChannel('@wjjhhh/jhooks channel')
    const [value, setValue] = useState('')
   
    return (
        <>
            <input value={value} onChange={e => setValue(e.target.value)} />
            <button onClick={() => post(value)}>send</button>
            get data from A:{data}
        </>
    )
}

export default () => {
    const { isSupported } = useBroadcastChannel()
    if(!isSupported) {
        return <div>not supported BroadcastChannel API</div>
    }
    return (
        <>
            <A />
            <div style={{ marginBottom: 20 }} />
            <B />
        </>
    )
}