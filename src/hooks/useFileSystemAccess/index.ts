import { useState } from 'react'

export default (options) => {
    const [file, setFile] = useState()
    const [data, setData] = useState()
    const isSupported = 'showSaveFilePicker' in window && 'showOpenFilePicker' in window
    
    const open = async () => {
        // @ts-ignore
        const newFile =  await showOpenFilePicker(options)
        setFile(newFile)
    }
    const save = async () => {
        // @ts-ignore
        const handle = await showSaveFilePicker(options)
        const writableStream  = await handle.createWritable()
        await writableStream.write(data)
        await writableStream.close()

    }
    const saveAs =async () => {
        
    }
   
    return {
        isSupported,
        open,
        file,
        save,
        saveAs,
        setData,
    }
}