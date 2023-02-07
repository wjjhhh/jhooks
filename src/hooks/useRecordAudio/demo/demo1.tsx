import React from 'react'
import { useRecordAudio }  from 'jhooks'


export default () => {
    const { isSupported, start, stop, src, pause, resume, getRecorder } = useRecordAudio()
    
    return isSupported ? (
        <>
            <button onClick={start}>开始录音</button>
            <button onClick={stop}>停止录音</button>
            <button onClick={pause}>暂停录音</button>
            <button onClick={resume}>恢复录音</button>
            <button onClick={() => {
                console.log('getRecorder', getRecorder())
            }}>获取Recorder对象</button>
            {
                src && <audio controls src={src} />
            }
        </>
    ) : '您的浏览器不支持【navigator.getUserMedia】录音功能'
}