import { useState, useEffect, useRef } from 'react';

const defaultConstraints: MediaStreamConstraints = {
  video: true,
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
    channelCount: 1,
  },
};

const useVolume = (constraints: MediaStreamConstraints = defaultConstraints) => {
  const [stream, setStream] = useState<MediaStream>();
  const [error, setError] = useState();
  const audioContextRef = useRef(new AudioContext());
  const [volume, setVolume] = useState(0);
  const [status, setStatus] = useState<'idle' | 'closed' | 'running' | 'suspended'>('idle');
  const getVolume = async (mediaStream: MediaStream) => {
    if (audioContextRef.current.state === 'closed') {
      audioContextRef.current = new AudioContext();
    } else if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    const audioContext = audioContextRef.current;

    await audioContext.audioWorklet.addModule('/worklets/volume-processor.js');
    const source = audioContext.createMediaStreamSource(mediaStream);
    const node = new AudioWorkletNode(audioContext, 'vumeter');

    node.port.onmessage = (event) => {
      if (event.data.volume) {
        setVolume(Math.round(event.data.volume));
      }
    };
    source.connect(node).connect(audioContext.destination);
    setStatus(audioContext.state);
  };
  const closeStream = async () => {
    stream?.getTracks().forEach((track) => {
      track.stop();
    });
    setStream(void 0);

    await audioContextRef.current?.close();
    setStatus('closed');
  };
  const startStream = () => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        setStream(mediaStream);
        getVolume(mediaStream);
      })
      .catch((error) => {
        console.error('Error accessing media devices.', error);
        setError(error);
      });
  };
  useEffect(() => {
    startStream();
  }, []);

  return {
    stream,
    error,
    audioContext: audioContextRef.current,
    volume,
    closeStream,
    startStream,
    status,
  };
};

export default useVolume;
