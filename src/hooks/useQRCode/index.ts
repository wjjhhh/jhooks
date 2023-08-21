import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

function useQRCode(text: string, options?: QRCode.QRCodeToDataURLOptions) {
    const [dataUrl, setDataUrl] = useState('')
    const toUrl = async (_text, _options) => {
        if (!_text) {
            setDataUrl('')
        } else {
            const url = await QRCode.toDataURL(_text, _options)
            setDataUrl(url)
        }
      
    }
    useEffect(() => {
        console.log('text', text)
        toUrl(text, options)
    }, [text, options])

    return dataUrl
}

export default useQRCode