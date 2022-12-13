import { useState } from 'react'

export default (options) => {
    const [file, setFile] = useState()
    
    const isSupported = 'showSaveFilePicker' in window && 'showOpenFilePicker' in window
    
    const open = async () => {
        // @ts-ignore
        const newFile =  await showOpenFilePicker(options)
        console.log('newFile', newFile)
        setFile(newFile)
    }
    return {
        isSupported,
        open,
        file
    }
}