import { useForceUpdate } from '@wjjhhh/jhooks'

export default () => {
    const forceUpdate = useForceUpdate()
    return (
        <div>
            <div>Date.now(): {Date.now()}</div>
            <button onClick={forceUpdate}>refresh</button>
        </div>
    )
}