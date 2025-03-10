import React from 'react'
import { useRecordAudio }  from '@wjjhhh/jhooks'


export default () => {
    const { isSupported, start, stop, url, pause, resume, status, getRecorder, destory } = useRecordAudio()
    console.log('status', status)
    return isSupported ? (
        <>  
            {['idle', 'paused', 'stopped'].includes(status) &&  <button onClick={start}>开始录音</button>}
           
            {
                status === 'recording' &&  (
                    <>
                        <button onClick={pause}>暂停录音</button>
                        <button onClick={stop}>停止录音</button>
                    </>
                )
            }
            {
                status === 'paused' &&  <button onClick={resume}>恢复录音</button>
            }

            {/* <button onClick={destory}>销毁录音</button> */}
            <button onClick={() => {
                console.log('getRecorder', getRecorder())
            }}>获取Recorder对象</button>
            {
                url && <audio controls src={url} />
            }
        </>
    ) : '您的浏览器不支持【navigator.getUserMedia】录音功能'
}