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
  const [src, setSrc] = useState<string>();
  const hasGetUserMedia = !!navigator.mediaDevices.getUserMedia;
  const start = async () => {
    captureUseMedia((mediaStream: MediaStream) => {
      streamRef.current = mediaStream;
      if (recorderRef.current) {
        recorderRef.current.destroy();
        recorderRef.current = null;
      }

      recorderRef.current = new RecordRTC(streamRef.current, {
        type: 'audio',
        numberOfAudioChannels: 2,
        checkForInactiveTracks: false,
        bufferSize: 16384,
        // recorderType: StereoPannerNode,
      });
      recorderRef.current?.startRecording();
    });
  };
  const stop = () => {
    recorderRef.current?.stopRecording(function () {
      //   let internalRecorder = recorderRef.current?.getInternalRecorder() as RecordRTC;
      //   const url = URL.createObjectURL(internalRecorder?.blob);
      const url = recorderRef.current?.toURL();
      setSrc(url);
    });
  };
  const pause = () => {
    recorderRef.current?.pauseRecording()
  };
  const resume = () => {
    recorderRef.current?.resumeRecording()
  };

  //   useEffect(() => {
  //     if (src) {
  //       return () => {
  //         URL.revokeObjectURL(src);
  //       };
  //     }
  //   }, [src]);
  return {
    isSupported: hasGetUserMedia,
    start,
    stop,
    pause,
    resume,
    src,
    recordRTC: recorderRef.current,
  };
};
