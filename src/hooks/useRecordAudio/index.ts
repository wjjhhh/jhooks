import { useRef, useState, useEffect } from 'react';
import RecordRTC from 'recordrtc';
// import type { MediaStreamRecorder } from 'recordrtc';

function captureUseMedia(callback: (stream: MediaStream) => void) {
  navigator.mediaDevices
    .getUserMedia({ audio: { echoCancellation: true } })
    .then((mediaStream) => {
      callback(mediaStream);
    })
    .catch((error) => {
      console.error(error);
    });
}

export default () => {
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<RecordRTC | null>(null);
  const [url, setUrl] = useState<string>();
  const [status, setStatus] = useState()
  const hasGetUserMedia = !!navigator.mediaDevices.getUserMedia;

  const start = async () => {
    captureUseMedia((mediaStream: MediaStream) => {
      streamRef.current = mediaStream;
    
      if (recorderRef.current) {
        recorderRef.current?.destroy();
        recorderRef.current = null;
      }

      recorderRef.current = new RecordRTC(streamRef.current, {
        type: 'audio',
        numberOfAudioChannels: 2,
        checkForInactiveTracks: false,
        bufferSize: 16384,
        // disableLogs: true,
        // recorderType: StereoPannerNode,
       
      });

      recorderRef.current?.startRecording();
    });
  };
  const stop = () => {
    recorderRef.current?.stopRecording(function () {
      //   let internalRecorder = recorderRef.current?.getInternalRecorder() as RecordRTC;
      //   const url = URL.createObjectURL(internalRecorder?.blob);
    
      setUrl(recorderRef.current?.toURL());
    });
  };
  const pause = () => {
    recorderRef.current?.pauseRecording()
  };
  const resume = () => {
    recorderRef.current?.resumeRecording()
  };
  const destory = () => {
    recorderRef.current?.destroy();
    recorderRef.current = null
  }

  return {
    isSupported: hasGetUserMedia,
    start,
    stop,
    pause,
    resume,
    status,
    url,
    destory,
    getRecorder: () => recorderRef.current,
    
  };
};
