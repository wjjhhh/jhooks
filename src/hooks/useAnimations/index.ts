import { useState } from 'react'

function useAnimation(target, keyframes, options) {
    const [pending, setPending] = useState(false)
    const play = () => {}
    const pause = () => {}
    const cancel = () => {}
    return {
        pending,
        play,
        pause,
        cancel,
    }
}

export default useAnimation