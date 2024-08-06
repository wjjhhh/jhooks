import { useState } from 'react';
import { useVolume } from 'jhooks';

const Volume = () => {
  const { volume, closeStream, startStream } = useVolume({
    video: false,
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      channelCount: 1,
    },
  });
  return (
    <>
      音量：{volume}
      <br />
      <button onClick={closeStream}>close</button>
      <button onClick={startStream}>start</button>
    </>
  );
};

export default () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {!visible && <button onClick={() => setVisible(true)}>start</button>}
      {visible && <Volume />}
    </>
  );
};
