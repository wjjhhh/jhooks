import { useState } from 'react'
import { useBroadcastChannel } from 'jhooks'

const A = () => {
    const { post, data } = useBroadcastChannel('jhooks')
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
    const { post, data } = useBroadcastChannel('jhooks')
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
    const { isSupported } = useBroadcastChannel('jhooks')

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