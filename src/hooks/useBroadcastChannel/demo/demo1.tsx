import { useState } from 'react'
import { useBroadcastChannel } from 'jhooks'

const A = () => {
    const { post, data } = useBroadcastChannel('jhooks channel', 'a')
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
    const { post, data } = useBroadcastChannel('jhooks channel', 'b')
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
    const { isSupported, data } = useBroadcastChannel('jhooks channel', 'zong')

    if(!isSupported) {
        return <div>not supported BroadcastChannel API</div>
    }
    return (

        <>
            <A />
            <div style={{ marginBottom: 20 }} />
            <B />
            ....
            {data}
        </>
    )
}