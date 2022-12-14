import { useState } from 'react'

export default (options) => {
    const [file, setFile] = useState()
    
    const isSupported = 'showSaveFilePicker' in window && 'showOpenFilePicker' in window
    
    const open = async () => {
        // @ts-ignore
        const newFile =  await showOpenFilePicker(options)
        setFile(newFile)
    }
    return {
        isSupported,
        open,
        file
    }
}