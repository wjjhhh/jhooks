import { useRef, useState, useEffect } from 'react'
import RecordRTC from 'recordrtc';

function captureUseMedia(callback) {
    
   navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false } }).then(mediaStream => {

    callback(mediaStream)
   }).catch(error => {
    console.error(error)
   })
}


export default () => {
   
    const streamRef = useRef(null)
    const recorderRef = useRef(null)
    const [src, setSrc] = useState<string>()
    const hasGetUserMedia = !!navigator.mediaDevices.getUserMedia;
    const start = async () => {

        captureUseMedia(mediaStream => {
            streamRef.current = mediaStream
            if (recorderRef.current) {
 
                recorderRef.current.destroy()
                recorderRef.current = null
            }
            recorderRef.current = RecordRTC(streamRef.current, {
                type: 'audio',
                numberOfAudioChannels: 2,
                checkForInactiveTracks: false,
                bufferSize: 16384,
                // recorderType: StereoPannerNode,
            })
            recorderRef.current.startRecording()
        })
    
    }
    const stop = () => {
        recorderRef.current.stopRecording(function() {
            let internalRecorder = recorderRef.current.getInternalRecorder()
            console.log('停止录音', internalRecorder, internalRecorder.blob)
            const url = URL.createObjectURL(internalRecorder.blob)
            setSrc(url)
          
           
        })
     
       
    }
    useEffect(() => {
        if (src) {
            return () => {
                URL.revokeObjectURL(src)
            }
        }
    }, [src])
    return {
        isSupported: hasGetUserMedia,
        start,
        stop,
        src,
        recordRTC: recorderRef.current,
    }
    
}