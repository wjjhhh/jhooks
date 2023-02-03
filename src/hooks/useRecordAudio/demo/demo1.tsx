import React from 'react'
import { useRecordAudio }  from 'jhooks'


export default () => {
    const { isSupported, start, stop, src, recordRTC } = useRecordAudio()
    
    return isSupported ? (
        <>
            <button onClick={start}>开始录音</button>
            <button onClick={stop}>停止录音</button>
            <button onClick={() => console.log('recordRTC', recordRTC)}>获取音频信息</button>
            {
                src && <audio controls src={src} />
            }
        </>
    ) : '您的浏览器不支持【navigator.getUserMedia】录音功能'
}